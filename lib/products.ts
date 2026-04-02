import { Product, ProductFeature } from "@/types/products";
import { calculateDiscountedPrice } from "./utils";


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

const baseProducts: Omit<Product, 'priceRange' | 'minPrice' | 'maxPrice'>[] = [
  {
    sku: "tender-col-8h",
    title: "Tender Colgante 8 hilos",
    categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 8H"],
    description: "Es liviano y fácil de usar gracias a su estructura de aluminio y a su mecanismo de reducción de peso. Elija la medida más adecuada para su espacio disponible.",
    code: "TENDER-COL-8H",
    sizes: [
      { name: "0,70 x 0,80", price: 800112 }, { name: "0,80 x 0,80", price: 800112 }, { name: "0,90 x 0,80", price: 800112 }, { name: "1,00 x 0,80", price: 800112 },
      { name: "1,10 x 0,80", price: 871871 }, { name: "1,20 x 0,80", price: 871871 }, { name: "1,30 x 0,80", price: 871871 }, { name: "1,40 x 0,80", price: 871871 },
    ],
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
    sizes: [
      { name: "0,70 x 0,45", price: 728352 }, { name: "0,70 x 0,50", price: 728352 }, { name: "0,70 x 0,60", price: 728352 }, { name: "0,70 x 0,70", price: 728352 },
      { name: "0,80 x 0,45", price: 728352 }, { name: "0,80 x 0,50", price: 728352 }, { name: "0,80 x 0,60", price: 728352 }, { name: "0,80 x 0,70", price: 728352 },
      { name: "0,90 x 0,45", price: 728352 }, { name: "0,90 x 0,50", price: 728352 }, { name: "0,90 x 0,60", price: 728352 }, { name: "0,90 x 0,70", price: 728352 },
      { name: "1,00 x 0,45", price: 800112 }, { name: "1,00 x 0,50", price: 800112 }, { name: "1,00 x 0,60", price: 800112 }, { name: "1,00 x 0,70", price: 800112 },
      { name: "1,10 x 0,45", price: 800112 }, { name: "1,10 x 0,50", price: 800112 }, { name: "1,10 x 0,60", price: 800112 }, { name: "1,10 x 0,70", price: 800112 },
      { name: "1,20 x 0,45", price: 800112 }, { name: "1,20 x 0,50", price: 800112 }, { name: "1,20 x 0,60", price: 800112 }, { name: "1,20 x 0,70", price: 800112 },
      { name: "1,30 x 0,45", price: 800112 }, { name: "1,30 x 0,50", price: 800112 }, { name: "1,30 x 0,60", price: 800112 }, { name: "1,30 x 0,70", price: 800112 },
      { name: "1,40 x 0,45", price: 800112 }, { name: "1,40 x 0,50", price: 800112 }, { name: "1,40 x 0,60", price: 800112 }, { name: "1,40 x 0,70", price: 800112 },
      { name: "1,50 x 0,45", price: 871871 }, { name: "1,50 x 0,50", price: 871871 }, { name: "1,50 x 0,60", price: 871871 }, { name: "1,50 x 0,70", price: 871871 },
      { name: "1,60 x 0,45", price: 871871 }, { name: "1,60 x 0,50", price: 871871 }, { name: "1,60 x 0,60", price: 871871 }, { name: "1,60 x 0,70", price: 871871 },
      { name: "1,70 x 0,45", price: 871871 }, { name: "1,70 x 0,50", price: 871871 }, { name: "1,70 x 0,60", price: 871871 }, { name: "1,70 x 0,70", price: 871871 },
    ],
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
    sizes: [
      { name: "0,70 x 0,30", price: 728352 }, { name: "0,80 x 0,30", price: 728352 }, { name: "0,90 x 0,30", price: 728352 },
      { name: "1,00 x 0,30", price: 728352 }, { name: "1,10 x 0,30", price: 728352 }, { name: "1,20 x 0,30", price: 728352 },
      { name: "1,30 x 0,30", price: 728352 }, { name: "1,40 x 0,30", price: 728352 }, { name: "1,50 x 0,30", price: 800112 },
      { name: "1,60 x 0,30", price: 800112 }, { name: "1,70 x 0,30", price: 800112 },
    ],
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
    sizes: [
      { name: "0,70 x 0,45", price: 800812 }, { name: "0,70 x 0,50", price: 800812 }, { name: "0,70 x 0,60", price: 800812 },
      { name: "0,80 x 0,45", price: 800812 }, { name: "0,80 x 0,50", price: 800812 }, { name: "0,80 x 0,60", price: 800812 },
      { name: "0,90 x 0,45", price: 800812 }, { name: "0,90 x 0,50", price: 800812 }, { name: "0,90 x 0,60", price: 800812 },
      { name: "1,00 x 0,45", price: 800812 }, { name: "1,00 x 0,50", price: 800812 }, { name: "1,00 x 0,60", price: 800812 },
      { name: "1,10 x 0,45", price: 800812 }, { name: "1,10 x 0,50", price: 800812 }, { name: "1,10 x 0,60", price: 800812 },
      { name: "1,20 x 0,45", price: 800812 }, { name: "1,20 x 0,50", price: 800812 }, { name: "1,20 x 0,60", price: 800812 },
      { name: "1,30 x 0,45", price: 800812 }, { name: "1,30 x 0,50", price: 800812 }, { name: "1,30 x 0,60", price: 800812 },
    ],
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
    sizes: [
      { name: "0,70 x 0,30", price: 728352 }, { name: "0,80 x 0,30", price: 728352 }, { name: "0,90 x 0,30", price: 728352 },
      { name: "1,00 x 0,30", price: 728352 }, { name: "1,10 x 0,30", price: 728352 }, { name: "1,20 x 0,30", price: 728352 },
      { name: "1,30 x 0,30", price: 728352 },
    ],
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

export const products: Product[] = baseProducts.map(product => {
  const prices = product.sizes.map(size => size.price);

  if (prices.length === 0) {
    return { ...product, priceRange: "Consultar precio" };
  }

  const minPrice = calculateDiscountedPrice(Math.min(...prices));
  const maxPrice = Math.max(...prices);

  // Si todos los tamaños cuestan lo mismo, muestra un solo precio. 
  // Si varían, muestra el rango de "Mínimo - Máximo"
  const priceRange = minPrice === maxPrice
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;

  return {
    ...product,
    priceRange,
    minPrice,
    maxPrice
  };
});

export function getProductBySku(sku: string): Product | undefined {
  return products.find(product => product.sku === sku);
}