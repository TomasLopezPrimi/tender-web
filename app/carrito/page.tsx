import CartView from "../../components/carrito/cart-view";
import { fetchPricingConfig, getHydratedProducts } from "@/lib/api/catalog";
import { baseProductMetadata } from "@/lib/products";
import { ProductSize } from "@/types/products";

export const dynamic = 'force-dynamic';

export default async function CarritoPage() {
  const [pricingConfig, { products }] = await Promise.all([
    fetchPricingConfig(),
    getHydratedProducts(baseProductMetadata),
  ]);

  const productSizes: Record<string, ProductSize[]> = {};
  for (const p of products) {
    productSizes[p.sku] = p.sizes;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-(--tender-navy-mid) mb-8">Tu Carrito</h1>
        
        <CartView pricingConfig={pricingConfig} productSizes={productSizes} />
      </main>
    </div>
  );
}