import CartView from "../../components/carrito/cart-view";
import { fetchPricingConfig, getHydratedProducts } from "@/lib/api/catalog";
import { baseProductMetadata } from "@/lib/products";
import { ProductSize } from "@/types/products";
import { getCheckoutCustomerData } from "@/lib/account/api";
import { getCustomerRefreshToken } from "@/lib/account/session";
import { config, getInterestFreeInstallments } from "@/config";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

const REFRESH_ATTEMPTED = "customerSessionRefreshed";

export default async function CarritoPage({ searchParams }: { searchParams: Promise<{ [REFRESH_ATTEMPTED]?: string }> }) {
  const params = await searchParams;
  const refreshAttempted = params[REFRESH_ATTEMPTED] === "1";

  const [pricingConfig, { products }, customerData] = await Promise.all([
    fetchPricingConfig(),
    getHydratedProducts(baseProductMetadata),
    getCheckoutCustomerData(),
  ]);

  const refreshToken = customerData ? null : await getCustomerRefreshToken();

  if (refreshAttempted && (customerData || !refreshToken)) redirect("/carrito");

  if (!customerData && !refreshAttempted && refreshToken) {
    const next = `/carrito?${REFRESH_ATTEMPTED}=1`;
    redirect(`/api/customer/session/refresh?next=${encodeURIComponent(next)}&failure=${encodeURIComponent(next)}`);
  }

  const productSizes: Record<string, ProductSize[]> = {};
  for (const p of products) {
    productSizes[p.sku] = p.sizes;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-(--tender-navy-mid) mb-8">Tu Carrito</h1>
        
        <CartView
          pricingConfig={pricingConfig}
          productSizes={productSizes}
          customerData={customerData}
          bankDetails={config.bankDetails}
          interestFreeInstallments={getInterestFreeInstallments()}
        />
      </main>
    </div>
  );
}
