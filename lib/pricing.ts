/**
 * pricing.ts
 *
 * Funciones puras de cálculo de precios y descuentos.
 * Sin fetch ni secretos — seguro para importar desde Client Components.
 */

import { PricingConfig, ProductMetadata, ProductSize, Product, BackendProductVariants } from "@/types/products";
import { formatPrice } from "@/lib/products";

export function normalizeDiscountRate(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function getGlobalDiscountRate(pricingConfig: PricingConfig): number {
  const { activo, porcentaje } = pricingConfig.descuento_global;
  if (!activo) return 0;
  return normalizeDiscountRate(porcentaje);
}

export function applyGlobalDiscount(price: number, pricingConfig: PricingConfig): number {
  const rate = getGlobalDiscountRate(pricingConfig);
  if (rate <= 0) return price;
  return price * (1 - rate);
}

export function getPaymentDiscountRate(pricingConfig: PricingConfig, method: string): number {
  const methodDiscount = pricingConfig.descuentos_por_metodo.find(
    (d) => d.metodo === method
  )?.porcentaje;
  return normalizeDiscountRate(methodDiscount ?? 0);
}

export function applyPaymentDiscount(price: number, discountRate: number): number {
  const safeRate = normalizeDiscountRate(discountRate);
  if (safeRate <= 0) return price;
  return price * (1 - safeRate);
}

export function applyCombinedDiscount(
  price: number,
  pricingConfig: PricingConfig,
  method: string
): number {
  const afterGlobal = applyGlobalDiscount(price, pricingConfig);
  const paymentRate = getPaymentDiscountRate(pricingConfig, method);
  return applyPaymentDiscount(afterGlobal, paymentRate);
}

export function getCombinedDiscountPercentage(
  pricingConfig: PricingConfig,
  method: string
): number {
  const g = getGlobalDiscountRate(pricingConfig);
  const p = getPaymentDiscountRate(pricingConfig, method);
  const combined = 1 - (1 - g) * (1 - p);
  return Math.round(combined * 100);
}

export function getGlobalDiscountLabel(pricingConfig: PricingConfig): string {
  if (!pricingConfig.descuento_global.activo) return "";
  return pricingConfig.descuento_global.label.trim();
}

export function shouldShowGlobalDiscountLabel(pricingConfig: PricingConfig): boolean {
  return getGlobalDiscountLabel(pricingConfig).length > 0;
}

export function hydrateProduct(
  metadata: ProductMetadata,
  backendVariants: BackendProductVariants,
  pricingConfig: PricingConfig
): Product {
  const sizes: ProductSize[] = backendVariants.variantes.map((v) => ({
    name: v.medida,
    price: v.precio_unitario,
    link_pago: v.link_pago ?? null,
  }));

  const displayPrices = sizes.map((s) => applyGlobalDiscount(s.price, pricingConfig));

  const minPrice = Math.min(...displayPrices);
  const maxPrice = Math.max(...displayPrices);

  const priceRange =
    minPrice === maxPrice
      ? formatPrice(minPrice)
      : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  return {
    ...metadata,
    sizes,
    priceRange,
    minPrice,
    maxPrice,
  };
}
