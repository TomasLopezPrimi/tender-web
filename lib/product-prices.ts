import type { PricingConfig, ProductSize } from '@/types/products';
import { applyCombinedDiscount, applyGlobalDiscount, getCombinedDiscountPercentage, getGlobalDiscountRate, getPaymentDiscountRate } from '@/lib/pricing';

export function getProductPrices(sizes: ProductSize[], selectedSize: ProductSize | null, pricingConfig: PricingConfig, installments: number | null) {
  const basePrice = selectedSize?.price ?? Math.min(...sizes.map((size) => size.price));
  if (!Number.isFinite(basePrice)) return null;

  const transferPrice = applyCombinedDiscount(basePrice, pricingConfig, 'TRANSFERENCIA');
  const cardPrice = applyGlobalDiscount(basePrice, pricingConfig);

  return {
    transferPrice,
    cardPrice,
    discountPercentage: getCombinedDiscountPercentage(pricingConfig, 'TRANSFERENCIA'),
    isTransferDiscount: getPaymentDiscountRate(pricingConfig, 'TRANSFERENCIA') > getGlobalDiscountRate(pricingConfig),
    installmentPrice: selectedSize && installments && installments > 1 ? cardPrice / installments : null,
  };
}
