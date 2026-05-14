/**
 * catalog.ts
 *
 * Capa de fetch que centraliza las llamadas al backend para:
 *   - configuración de pricing/descuentos
 *   - variantes visibles por producto
 *
 * Solo para Server Components (Next.js App Router).
 * Las funciones de cálculo puras están en lib/pricing.ts.
 */

import 'server-only';

import { BackendProductVariants, PricingConfig, Product, ProductMetadata } from "@/types/products";
import { hydrateProduct } from "@/lib/pricing";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
const API_KEY = process.env.INTERNAL_API_KEY || "";

// ── Helpers de fetch ─────────────────────────────────────────────────────────

async function backendGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { "X-Api-Key": API_KEY },
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`Backend ${path} → ${res.status}`);
  return res.json() as Promise<T>;
}

// ── Pricing ──────────────────────────────────────────────────────────────────

const DEFAULT_PRICING_CONFIG: PricingConfig = {
  descuento_global: { activo: false, porcentaje: 0, label: "" },
  descuentos_por_metodo: [],
};

export async function fetchPricingConfig(): Promise<PricingConfig> {
  try {
    return await backendGet<PricingConfig>("/pricing/config");
  } catch {
    return DEFAULT_PRICING_CONFIG;
  }
}

// ── Variantes ────────────────────────────────────────────────────────────────

export async function fetchVariants(
  skus: string[]
): Promise<BackendProductVariants[]> {
  if (skus.length === 0) return [];
  const params = skus.map((s) => `skus=${encodeURIComponent(s)}`).join("&");
  try {
    return await backendGet<BackendProductVariants[]>(`/catalogo/variantes?${params}`);
  } catch {
    return [];
  }
}

// ── Hidratación ──────────────────────────────────────────────────────────────

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
