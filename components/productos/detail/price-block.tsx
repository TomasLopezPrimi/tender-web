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
}

export default function PriceBlock({ product, selectedSize, pricingConfig }: PriceBlockProps) {
  if (!selectedSize) {
    return (
      <div className="mb-8 min-h-[70px] flex flex-col justify-end">
        <div className="text-2xl font-bold text-(--tender-cyan) tracking-tight">
          {product.minPrice ? "Desde " + formatPrice(product.minPrice) : ""}
          <span className="text-xs font-normal ml-2 opacity-70 text-(--tender-navy) uppercase tracking-widest">
            Iva incluido
          </span>
        </div>
        {product.transferDiscountPercentage > 0 && (
          <span className="mt-2 w-fit text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full tracking-wide">
            {product.transferDiscountPercentage}% OFF por transferencia
          </span>
        )}
      </div>
    );
  }

  const priceWithDiscount = formatPrice(
    applyCombinedDiscount(selectedSize.price, pricingConfig, 'TRANSFERENCIA')
  );
  const totalDiscountPct = getCombinedDiscountPercentage(pricingConfig, 'TRANSFERENCIA');
  const isTransferDiscount = getPaymentDiscountRate(pricingConfig, 'TRANSFERENCIA')
    > getGlobalDiscountRate(pricingConfig);

  return (
    <div className="mb-8 min-h-[70px] flex flex-col justify-end">
      <div className="animate-in fade-in slide-in-from-left-2 duration-300">
        {/* Precio original tachado */}
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className="text-base text-gray-400 line-through decoration-gray-300">
            {formatPrice(selectedSize.price)}
          </span>
          <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full tracking-wide">
            {totalDiscountPct}% OFF{isTransferDiscount ? ' por transferencia' : ''}
          </span>
        </div>

        {/* Precio con descuento */}
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-(--tender-cyan) tracking-tight flex items-baseline gap-2">
            {priceWithDiscount}
          </div>
        </div>
      </div>
    </div>
  );
}
