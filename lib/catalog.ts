/**
 * catalog.ts
 *
 * Capa de fetch que centraliza las llamadas al backend para:
 *   - configuración de pricing/descuentos
 *   - variantes visibles por producto
 *
 * Pensado para usarse en Server Components (Next.js App Router).
 */

import {
  BackendProductVariants,
  PricingConfig,
  Product,
  ProductMetadata,
  ProductSize,
} from "@/types/products";
import { formatPrice } from "@/lib/products";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
const API_KEY = process.env.INTERNAL_API_KEY || "";

// ── Helpers de fetch ─────────────────────────────────────────────────────────

async function backendGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { "X-Api-Key": API_KEY },
    next: { revalidate: 60 }, // cache 60 s, ajustable
  });
  if (!res.ok) throw new Error(`Backend ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// ── Pricing ──────────────────────────────────────────────────────────────────

export async function fetchPricingConfig(): Promise<PricingConfig> {
  return backendGet<PricingConfig>("/pricing/config");
}

// ── Variantes ────────────────────────────────────────────────────────────────

export async function fetchVariants(
  skus: string[]
): Promise<BackendProductVariants[]> {
  if (skus.length === 0) return [];
  const params = skus.map((s) => `skus=${encodeURIComponent(s)}`).join("&");
  return backendGet<BackendProductVariants[]>(`/catalogo/variantes?${params}`);
}

// ── Hidratación ──────────────────────────────────────────────────────────────

/**
 * Aplica el descuento global al precio base para obtener el precio de exhibición.
 */
export function applyGlobalDiscount(
  price: number,
  pricingConfig: PricingConfig
): number {
  const rate = getGlobalDiscountRate(pricingConfig);
  if (rate <= 0) return price;
  return price * (1 - rate);
}

export function getGlobalDiscountRate(pricingConfig: PricingConfig): number {
  const { activo, porcentaje } = pricingConfig.descuento_global;
  if (!activo) return 0;
  return normalizeDiscountRate(porcentaje);
}

export function getPaymentDiscountRate(
  pricingConfig: PricingConfig,
  method: string
): number {
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

function normalizeDiscountRate(value: number): number {
  if (!Number.isFinite(value)) return 0;
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

/**
 * Toma metadata local de un producto y una lista de variantes del backend
 * y retorna un Product completo listo para usar en la UI.
 *
 * El precio mínimo y máximo se calculan después de aplicar el descuento global
 * para que el listado muestre ya el precio de exhibición.
 */
export function hydrateProduct(
  metadata: ProductMetadata,
  backendVariants: BackendProductVariants,
  pricingConfig: PricingConfig
): Product {
  const sizes: ProductSize[] = backendVariants.variantes.map((v) => ({
    name: v.medida,
    price: v.precio_unitario,
  }));

  const displayPrices = sizes.map((s) =>
    applyGlobalDiscount(s.price, pricingConfig)
  );

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

/**
 * Retorna los productos visibles con sus variantes e información de pricing
 * hidratada desde backend. Los productos sin variantes se omiten.
 */
export async function getHydratedProducts(
  metadataList: ProductMetadata[]
): Promise<{ products: Product[]; pricingConfig: PricingConfig }> {
  const skus = metadataList.map((p) => p.sku);

  const [variantsData, pricingConfig] = await Promise.all([
    fetchVariants(skus),
    fetchPricingConfig(),
  ]);

  const variantsByProduct = new Map(
    variantsData.map((v) => [v.id_producto, v])
  );

  const products: Product[] = metadataList
    .filter((meta) => variantsByProduct.has(meta.sku))
    .map((meta) =>
      hydrateProduct(meta, variantsByProduct.get(meta.sku)!, pricingConfig)
    );

  return { products, pricingConfig };
}
