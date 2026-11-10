import { formatPrice } from '@/lib/products';
import { getProductPrices } from '@/lib/product-prices';
import type { PricingConfig, ProductSize } from '@/types/products';

interface PriceBlockProps {
  sizes: ProductSize[];
  selectedSize: ProductSize | null;
  pricingConfig: PricingConfig;
  interestFreeInstallments: number | null;
}

export default function PriceBlock({ sizes, selectedSize, pricingConfig, interestFreeInstallments }: PriceBlockProps) {
  const prices = getProductPrices(sizes, selectedSize, pricingConfig, interestFreeInstallments);
  if (!prices) return null;

  return (
    <div className="mb-6">
      <div className="overflow-hidden rounded-xl border border-(--border) divide-y divide-(--border)">
        <div className="bg-(--tender-cyan)/5 p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-(--tender-navy)">Por transferencia</h2>
          <p className="mt-2 break-words text-3xl font-bold tracking-tight text-(--tender-cyan) tabular-nums sm:text-4xl">
            {!selectedSize && <span className="text-base font-medium">Desde </span>}
            {formatPrice(prices.transferPrice)}
          </p>
          <p className="mt-2 text-xs text-(--tender-text-muted)">
            {prices.discountPercentage > 0 ? `${prices.discountPercentage}% de descuento incluido` : 'Precio final'}
          </p>
        </div>

        <div className="p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-(--tender-navy)">Con tarjeta de crédito</h2>
          <p className="mt-2 break-words text-xl font-bold text-(--tender-navy) tabular-nums sm:text-2xl">
            <span className="text-sm font-normal">{selectedSize ? 'Total ' : 'Desde '}</span>
            {formatPrice(prices.cardPrice)}
          </p>
          {interestFreeInstallments && interestFreeInstallments > 1 && (
            <>
              <p className="mt-2 text-sm leading-relaxed text-(--tender-navy)">
                Hasta {interestFreeInstallments} cuotas sin interés
                {prices.installmentPrice !== null && <> de <strong>{formatPrice(prices.installmentPrice)}</strong> aprox.</>}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-(--tender-text-muted)">
                Visa, Mastercard y American Express · Getnet
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 space-y-1 text-[11px] leading-relaxed text-gray-500">
        <p>IVA incluido.</p>
        {prices.isTransferDiscount && <p>El descuento por transferencia no aplica al pagar con tarjeta.</p>}
      </div>
    </div>
  );
}
