import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { createElement } from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

function load(file, imports = {}) {
  const source = readFileSync(resolve(import.meta.dirname, '..', file), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  });
  const exports = {};
  runInNewContext(outputText, { exports, require: (name) => {
    assert.ok(name in imports, `Import inesperado: ${name}`);
    return imports[name];
  } });
  return exports;
}

const products = load('lib/products.ts');
const pricing = load('lib/pricing.ts', { '@/lib/products': products });
const pricesModule = load('lib/product-prices.ts', { '@/lib/pricing': pricing });
const { getProductPrices } = pricesModule;
const { default: PriceBlock } = load('components/productos/detail/price-block.tsx', {
  '@/lib/products': products,
  '@/lib/product-prices': pricesModule,
  'react/jsx-runtime': jsxRuntime,
});

const small = { name: '1,10 x 0,80', price: 871871 };
const large = { name: '1,50 x 0,80', price: 1000000 };
const sizes = [large, small];
const config = (global, transfer) => ({
  descuento_global: { activo: true, porcentaje: global, label: '' },
  descuentos_por_metodo: [{ metodo: 'TRANSFERENCIA', porcentaje: transfer }],
});
const cents = (value) => Math.round(value * 100);
const transferOffer = config(0, 20);
const selected = getProductPrices(sizes, small, transferOffer, 3);
assert.equal(cents(selected.transferPrice), 69749680);
assert.equal(selected.cardPrice, 871871);
assert.equal(cents(selected.installmentPrice), 29062367);
assert.equal(selected.isTransferDiscount, true);

const unselected = getProductPrices(sizes, null, transferOffer, 3);
assert.equal(unselected.cardPrice, small.price);
assert.equal(cents(unselected.transferPrice), 69749680);
assert.equal(unselected.installmentPrice, null);
assert.equal(getProductPrices(sizes, large, transferOffer, 3).cardPrice, large.price);

const globalOffer = getProductPrices(sizes, small, config(25, 20), 3);
assert.equal(globalOffer.transferPrice, globalOffer.cardPrice);
assert.equal(globalOffer.discountPercentage, 25);
assert.equal(globalOffer.isTransferDiscount, false);
assert.equal(getProductPrices(sizes, small, config(20, 20), 3).isTransferDiscount, false);
assert.equal(getProductPrices(sizes, small, config(0, 0), 3).discountPercentage, 0);
assert.equal(getProductPrices(sizes, small, { ...config(50, 20), descuento_global: { activo: false, porcentaje: 50 } }, 3).cardPrice, small.price);
for (const installments of [null, 0, 1]) {
  assert.equal(getProductPrices(sizes, small, transferOffer, installments).installmentPrice, null);
}
assert.equal(getProductPrices([], null, transferOffer, 3), null);
assert.equal(getProductPrices(sizes, small, config(100, 0), 3).cardPrice, 0);

const render = (selectedSize, pricingConfig = transferOffer, interestFreeInstallments = 3) => renderToStaticMarkup(createElement(PriceBlock, {
  sizes, selectedSize, pricingConfig, interestFreeInstallments,
}));
const html = render(small);
assert.ok(html.includes('Por transferencia'));
assert.ok(html.includes('Con tarjeta de crédito'));
assert.ok(html.includes(products.formatPrice(selected.cardPrice)));
assert.ok(html.includes(`<strong>${products.formatPrice(selected.installmentPrice)}</strong>`));
assert.ok(!html.includes('line-through'));
assert.ok(!render(null).includes('aprox.'));
assert.ok(!render(small, transferOffer, null).includes('cuotas sin interés'));
assert.ok(!render(small, config(25, 20)).includes('El descuento por transferencia no aplica'));
const page = readFileSync(resolve(import.meta.dirname, '../components/productos/product-client-page.tsx'), 'utf8');
assert.ok(page.indexOf('<SizeSelector') < page.indexOf('<PriceBlock'));
console.log('Precios por método, cuotas y selección de medida: OK');
