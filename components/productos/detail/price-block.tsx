import { formatPrice } from '@/lib/products';
import {
  applyCombinedDiscount,
  getCombinedDiscountPercentage,
  getGlobalDiscountRate,
  getPaymentDiscountRate,
} from '@/lib/pricing';
import { PricingConfig, Product, ProductSize } from '@/types/products';

interface PriceBlockProps {
  product: Product;
  selectedSize: ProductSize | null;
  pricingConfig: PricingConfig;
  interestFreeInstallments: number | null;
}

export default function PriceBlock({ product, selectedSize, pricingConfig, interestFreeInstallments }: PriceBlockProps) {
  const isTransferDiscount = selectedSize
    ? getPaymentDiscountRate(pricingConfig, 'TRANSFERENCIA') > getGlobalDiscountRate(pricingConfig)
    : product.transferDiscountPercentage > 0;
  const displayedPrice = selectedSize
    ? formatPrice(applyCombinedDiscount(selectedSize.price, pricingConfig, 'TRANSFERENCIA'))
    : product.minPrice ? formatPrice(product.minPrice) : '';
  const totalDiscountPct = selectedSize
    ? getCombinedDiscountPercentage(pricingConfig, 'TRANSFERENCIA')
    : product.transferDiscountPercentage;

  return (
    <div className="mb-8 min-h-[70px] flex flex-col justify-end">
      {selectedSize ? (
        <div className="animate-in fade-in slide-in-from-left-2 duration-300">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="text-base text-gray-400 line-through decoration-gray-300">
              {formatPrice(selectedSize.price)}
            </span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black tracking-wide text-green-700">
              {totalDiscountPct}% OFF{isTransferDiscount ? ' por transferencia' : ''}
            </span>
          </div>
        </div>
      ) : null}

      <div className={`${selectedSize ? 'text-4xl' : 'text-2xl'} flex items-baseline gap-2 font-bold tracking-tight text-(--tender-cyan)`}>
        {!selectedSize && 'Desde '}{displayedPrice}
        {!selectedSize && (
          <span className="ml-2 text-xs font-normal uppercase tracking-widest text-(--tender-navy) opacity-70">
            IVA incluido
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-gray-500">Precio pagando por transferencia</p>

      {!selectedSize && product.transferDiscountPercentage > 0 && (
        <span className="mt-2 w-fit rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-black tracking-wide text-green-700">
          {product.transferDiscountPercentage}% OFF por transferencia
        </span>
      )}

      {isTransferDiscount && (
        <p className="mt-2 text-xs leading-relaxed text-gray-600">
          El descuento por transferencia no aplica al pagar con tarjeta.
        </p>
      )}

      {interestFreeInstallments && (
        <div className="mt-3 rounded-md border border-(--tender-cyan)/25 bg-(--tender-cyan)/5 p-3">
          <p className="text-sm font-bold text-(--tender-navy)">
            Hasta {interestFreeInstallments} cuotas sin interés
          </p>
          <p className="mt-1 text-xs leading-relaxed text-(--tender-text-muted)">
            Con tarjetas de crédito Visa, Mastercard y American Express en Getnet.
          </p>
        </div>
      )}
    </div>
  );
}
