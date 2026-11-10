'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PricingConfig, ProductSize, Product } from '@/types/products';
import PromoLabel from '@/components/ui/promo-label';
import { getGlobalDiscountLabel, shouldShowGlobalDiscountLabel } from '@/lib/pricing';
import ProductGallery from './detail/product-gallery';
import SizeSelector from './detail/size-selector';
import PriceBlock from './detail/price-block';
import HangingSpaceNote from './detail/hanging-space-note';
import AddToCartButton from './detail/add-to-cart-button';

interface ProductClientPageProps {
  product: Product;
  sku: string;
  pricingConfig: PricingConfig;
  interestFreeInstallments: number | null;
}

export default function ProductClientPage({ product, sku, pricingConfig, interestFreeInstallments }: ProductClientPageProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  const globalLabel = getGlobalDiscountLabel(pricingConfig);
  const showGlobalLabel = shouldShowGlobalDiscountLabel(pricingConfig);

  return (
    <div className="container mx-auto px-4 pt-12 max-w-7xl">
      {showGlobalLabel && <div className="mb-6"><PromoLabel label={globalLabel} variant="hero" /></div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
        {/* COLUMNA IZQUIERDA: GALERÍA */}
        <ProductGallery images={product.images} title={product.title} />

        {/* COLUMNA DERECHA: INFO COMPRA */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Image src="/images/producto/garantia.png" alt="Garantía" width={50} height={50} className="opacity-80" />
            <span className="text-[11px] font-bold text-(--tender-text-muted) tracking-widest uppercase">SKU: {product.code}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif text-(--tender-navy) leading-tight mb-4">{product.title}</h1>

          <PriceBlock
            product={product}
            selectedSize={selectedSize}
            pricingConfig={pricingConfig}
            interestFreeInstallments={interestFreeInstallments}
          />

          <p className="text-(--tender-text-dark) leading-relaxed text-sm mb-10 border-l-2 border-(--tender-cyan)/20 pl-4 italic">{product.description}</p>

          <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onChange={setSelectedSize} />

          <HangingSpaceNote sku={sku} selectedSize={selectedSize} />

          <AddToCartButton product={product} selectedSize={selectedSize} />
        </div>
      </div>
    </div>
  );
}
