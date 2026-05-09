import { ProductFeature, ProductMetadata } from "@/types/products";

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(price);
}

const colganteFeatures: ProductFeature[] = [
  { title: "Caja con Freno", description: "Para detenerlo y fijarlo a cualquier altura de secado, haciendo el mínimo esfuerzo." },
  { title: "Fino Diseño", description: "Esquineros redondeados y tensores sellados para proteger las prendas más delicadas." },
  { title: "Alma de Acero", description: "Hilos de PVC para colgado con 14 almas de acero y sistema de tensado individual." },
  { title: "Ultra Liviano", description: "Estructura de aluminio anodizado con barral oval de máxima resistencia." },
  { title: "Barral Central", description: "De aluminio anodizado, soporta las prendas más pesadas y se suma como un espacio adicional a los hilos de colgado." },
  { title: "Fácil Colocación", description: "Sencillas instrucciones de armado. Además puede solicitar su instalación." }
];

const rebatibleFeatures: ProductFeature[] = [
  { title: "Traba Articulada", description: "Permite colocarlo a 90 grados de la pared. Cuando no se usa ocupa solo 10 cm." },
  { title: "Fino Diseño", description: "Esquineros redondeados y tensores sellados para proteger las prendas más delicadas." },
  { title: "Alma de Acero", description: "Hilos de PVC para colgado con 14 almas de acero y sistema de tensado individual." },
  { title: "Ultra Liviano", description: "Estructura de aluminio anodizado con barral oval de máxima resistencia." },
  { title: "Barral Central", description: "De aluminio anodizado, soporta las prendas más pesadas y se suma como un espacio adicional a los hilos de colgado." },
  { title: "Fácil Colocación", description: "Sencillas instrucciones de armado. Además puede solicitar su instalación." }
];

const colganteVideo = "https://www.youtube.com/embed/eY4S7nUCGl0";
const rebatibleVideo = "https://www.youtube.com/embed/crla_4OY4fs";

/**
 * Metadata hardcodeada de los productos.
 * NO incluye medidas ni precios; esos datos vienen del backend.
 */
export const baseProductMetadata: ProductMetadata[] = [
  {
    sku: "tender-col-8h",
    title: "Tender Colgante 8 hilos",
    categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 8H"],
    description: "Es liviano y fácil de usar gracias a su estructura de aluminio y a su mecanismo de reducción de peso. Elija la medida más adecuada para su espacio disponible.",
    code: "TENDER-COL-8H",
    images: [
      "/images/producto/tender-col-8h.jpg",
      "/images/producto/1.jpg",
      "/images/producto/2.jpg",
      "/images/producto/3.jpg",
      "/images/producto/4.jpg",
      "/images/producto/5.jpg",
      "/images/producto/resorte.gif"
    ],
    features: colganteFeatures,
    videoUrl: colganteVideo
  },
  {
    sku: "tender-col-6h",
    title: "Tender Colgante 6 hilos",
    categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 6H"],
    description: "Estructura liviana de aluminio con mecanismo de poleas. Ideal para aprovechar el espacio aéreo en balcones y lavaderos.",
    code: "TENDER-COL-6H",
    images: [
      "/images/producto/tender-col-6h.jpg",
      "/images/producto/1.jpg",
      "/images/producto/2.jpg",
      "/images/producto/3.jpg",
      "/images/producto/4.jpg",
      "/images/producto/5.jpg",
      "/images/producto/resorte.gif"
    ],
    features: colganteFeatures,
    videoUrl: colganteVideo
  },
  {
    sku: "tender-col-4h",
    title: "Tender Colgante 4 hilos",
    categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 4H"],
    description: "La solución más compacta para techos, excelente para pasillos o espacios muy reducidos.",
    code: "TENDER-COL-4H",
    images: [
      "/images/producto/tender-col-4h.jpg",
      "/images/producto/1.jpg",
      "/images/producto/2.jpg",
      "/images/producto/3.jpg",
      "/images/producto/4.jpg",
      "/images/producto/5.jpg",
      "/images/producto/resorte.gif"
    ],
    features: colganteFeatures,
    videoUrl: colganteVideo
  },
  {
    sku: "tender-reb-6h",
    title: "Tender Rebatible 6 hilos",
    categoryPath: ["Inicio", "Tendederos", "Rebatibles", "Tender Rebatible 6H"],
    description: "Perfecto para espacios donde no se puede perforar el techo. Se pliega contra la pared cuando no está en uso.",
    code: "TENDER-REB-6H",
    images: [
      "/images/producto/tender-reb-6h.jpg",
      "/images/producto/1.jpg",
      "/images/producto/2.jpg",
      "/images/producto/3.jpg",
      "/images/producto/4.jpg",
      "/images/producto/5.jpg",
      "/images/producto/resorte.gif"
    ],
    features: rebatibleFeatures,
    videoUrl: rebatibleVideo
  },
  {
    sku: "tender-reb-4h",
    title: "Tender Rebatible 4 hilos",
    categoryPath: ["Inicio", "Tendederos", "Rebatibles", "Tender Rebatible 4H"],
    description: "Nuestro modelo de pared más estrecho, optimizado para balcones pequeños y pasillos de servicio.",
    code: "TENDER-REB-4H",
    images: [
      "/images/producto/tender-reb-4h.jpg",
      "/images/producto/1.jpg",
      "/images/producto/2.jpg",
      "/images/producto/3.jpg",
      "/images/producto/4.jpg",
      "/images/producto/5.jpg",
      "/images/producto/resorte.gif"
    ],
    features: rebatibleFeatures,
    videoUrl: rebatibleVideo
  }
];

/** Busca metadata local por sku. Útil para páginas de detalle. */
export function getMetadataBySku(sku: string): ProductMetadata | undefined {
  return baseProductMetadata.find(p => p.sku === sku);
}
