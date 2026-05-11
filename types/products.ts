export interface CartItem {
  id: string;
  sku: string;
  nombre: string;
  medida: string;
  precio: number;
  cantidad: number;
  link_pago?: string | null;
}

export interface ProductSize {
  name: string;
  price: number;
  link_pago?: string | null;
}

export interface ProductFeature {
  title: string;
  description: string;
}

/** Metadata hardcodeada en frontend. No incluye precios ni medidas. */
export interface ProductMetadata {
  sku: string;
  title: string;
  categoryPath: string[];
  description: string;
  code: string;
  images: string[];
  features: ProductFeature[];
  videoUrl: string;
}

/**
 * Producto completo, resultado de combinar metadata local con
 * variantes y precios provenientes del backend.
 * Solo existe para productos que el backend devuelve con al menos una variante.
 */
export interface Product extends ProductMetadata {
  sizes: ProductSize[];
  priceRange: string;
  minPrice: number;
  maxPrice: number;
}

export interface UIProduct extends Product {
  badge?: string;
  badgeColor?: string;
}

// ── Tipos de respuesta del backend ──────────────────────────────────────────

export interface BackendVariant {
  medida: string;
  precio_unitario: number;
  link_pago?: string | null;
}

export interface BackendProductVariants {
  id_producto: string;
  variantes: BackendVariant[];
}

export interface GlobalDiscountInfo {
  activo: boolean;
  porcentaje: number;
  label: string;
}

export interface PaymentDiscountInfo {
  metodo: string;
  porcentaje: number;
}

export interface PricingConfig {
  descuento_global: GlobalDiscountInfo;
  descuentos_por_metodo: PaymentDiscountInfo[];
}
