export interface ProductSize {
    name: string;
    price: number;
  }
  
  export interface ProductFeature {
    title: string;
    description: string;
  }
  
  export interface Product {
    sku: string;
    title: string;
    categoryPath: string[];
    priceRange: string;
    description: string;
    code: string;
    sizes: ProductSize[];
    images: string[];
    features: ProductFeature[];
    videoUrl: string;
  }
  
  export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(price);
  }
  
  // Arrays de características para reutilizar y no repetir código
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
  
  export const products: Product[] = [
    {
      sku: "tender-col-8h",
      title: "Tender Colgante 8H",
      categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 8H"],
      priceRange: "$727.375,00 - $792.610,00",
      description: "Tender Colgante de 8 Hilos: Es liviano y fácil de usar gracias a su estructura de aluminio y a su mecanismo de reducción de peso. Elija la medida más adecuada para su espacio disponible.",
      code: "TENDER-COL-8H",
      sizes: [
        { name: "0,70 x 0,80", price: 727375 }, { name: "0,80 x 0,80", price: 727375 }, { name: "0,90 x 0,80", price: 727375 }, { name: "1,00 x 0,80", price: 727375 },
        { name: "1,10 x 0,80", price: 792610 }, { name: "1,20 x 0,80", price: 792610 }, { name: "1,30 x 0,80", price: 792610 }, { name: "1,40 x 0,80", price: 792610 },
      ],
      images: ["/images/producto/tender-col-8h.jpg", "/images/producto/thumb-1.jpg", "/images/producto/thumb-2.jpg"],
      features: colganteFeatures,
      videoUrl: colganteVideo
    },
    {
      sku: "tender-col-6h",
      title: "Tender Colgante 6H",
      categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 6H"],
      priceRange: "$662.138,00 - $792.610,00",
      description: "Tender Colgante de 6 Hilos: Estructura liviana de aluminio con mecanismo de poleas. Ideal para aprovechar el espacio aéreo en balcones y lavaderos.",
      code: "TENDER-COL-6H",
      sizes: [
        { name: "0,70 x 0,45", price: 662138 }, { name: "0,70 x 0,50", price: 662138 }, { name: "0,70 x 0,60", price: 662138 }, { name: "0,70 x 0,70", price: 662138 },
        { name: "0,80 x 0,45", price: 662138 }, { name: "0,80 x 0,50", price: 662138 }, { name: "0,80 x 0,60", price: 662138 }, { name: "0,80 x 0,70", price: 662138 },
        { name: "0,90 x 0,45", price: 662138 }, { name: "0,90 x 0,50", price: 662138 }, { name: "0,90 x 0,60", price: 662138 }, { name: "0,90 x 0,70", price: 662138 },
        { name: "1,00 x 0,45", price: 727375 }, { name: "1,00 x 0,50", price: 727375 }, { name: "1,00 x 0,60", price: 727375 }, { name: "1,00 x 0,70", price: 727375 },
        { name: "1,10 x 0,45", price: 727375 }, { name: "1,10 x 0,50", price: 727375 }, { name: "1,10 x 0,60", price: 727375 }, { name: "1,10 x 0,70", price: 727375 },
        { name: "1,20 x 0,45", price: 727375 }, { name: "1,20 x 0,50", price: 727375 }, { name: "1,20 x 0,60", price: 727375 }, { name: "1,20 x 0,70", price: 727375 },
        { name: "1,30 x 0,45", price: 727375 }, { name: "1,30 x 0,50", price: 727375 }, { name: "1,30 x 0,60", price: 727375 }, { name: "1,30 x 0,70", price: 727375 },
        { name: "1,40 x 0,45", price: 727375 }, { name: "1,40 x 0,50", price: 727375 }, { name: "1,40 x 0,60", price: 727375 }, { name: "1,40 x 0,70", price: 727375 },
        { name: "1,50 x 0,45", price: 792610 }, { name: "1,50 x 0,50", price: 792610 }, { name: "1,50 x 0,60", price: 792610 }, { name: "1,50 x 0,70", price: 792610 },
        { name: "1,60 x 0,45", price: 792610 }, { name: "1,60 x 0,50", price: 792610 }, { name: "1,60 x 0,60", price: 792610 }, { name: "1,60 x 0,70", price: 792610 },
        { name: "1,70 x 0,45", price: 792610 }, { name: "1,70 x 0,50", price: 792610 }, { name: "1,70 x 0,60", price: 792610 }, { name: "1,70 x 0,70", price: 792610 },
      ],
      images: ["/images/producto/tender-col-6h.jpg"],
      features: colganteFeatures,
      videoUrl: colganteVideo
    },
    {
      sku: "tender-col-4h",
      title: "Tender Colgante 4H",
      categoryPath: ["Inicio", "Tendederos", "Colgantes", "Tender Colgante 4H"],
      priceRange: "$505.301,00 - $727.375,00",
      description: "Tender Colgante de 4 Hilos: La solución más compacta para techos, excelente para pasillos o espacios muy reducidos.",
      code: "TENDER-COL-4H",
      sizes: [
        { name: "0,70 x 0,30", price: 505301 }, { name: "0,80 x 0,30", price: 505301 }, { name: "0,90 x 0,30", price: 505301 },
        { name: "1,00 x 0,30", price: 662138 }, { name: "1,10 x 0,30", price: 662138 }, { name: "1,20 x 0,30", price: 662138 },
        { name: "1,30 x 0,30", price: 662138 }, { name: "1,40 x 0,30", price: 662138 }, { name: "1,50 x 0,30", price: 727375 },
        { name: "1,60 x 0,30", price: 727375 }, { name: "1,70 x 0,30", price: 727375 },
      ],
      images: ["/images/producto/tender-col-4h.jpg"],
      features: colganteFeatures,
      videoUrl: colganteVideo
    },
    {
      sku: "tender-reb-6h",
      title: "Tender Rebatible 6H",
      categoryPath: ["Inicio", "Tendederos", "Rebatibles", "Tender Rebatible 6H"],
      priceRange: "$662.138,00 - $727.375,00",
      description: "Tender de pared rebatible de 6 Hilos: Perfecto para espacios donde no se puede perforar el techo. Se pliega contra la pared cuando no está en uso.",
      code: "TENDER-REB-6H",
      sizes: [
        { name: "0,70 x 0,45", price: 662138 }, { name: "0,70 x 0,50", price: 662138 }, { name: "0,70 x 0,60", price: 662138 },
        { name: "0,80 x 0,45", price: 662138 }, { name: "0,80 x 0,50", price: 662138 }, { name: "0,80 x 0,60", price: 662138 },
        { name: "0,90 x 0,45", price: 662138 }, { name: "0,90 x 0,50", price: 662138 }, { name: "0,90 x 0,60", price: 662138 },
        { name: "1,00 x 0,45", price: 727375 }, { name: "1,00 x 0,50", price: 727375 }, { name: "1,00 x 0,60", price: 727375 },
        { name: "1,10 x 0,45", price: 727375 }, { name: "1,10 x 0,50", price: 727375 }, { name: "1,10 x 0,60", price: 727375 },
        { name: "1,20 x 0,45", price: 727375 }, { name: "1,20 x 0,50", price: 727375 }, { name: "1,20 x 0,60", price: 727375 },
        { name: "1,30 x 0,45", price: 727375 }, { name: "1,30 x 0,50", price: 727375 }, { name: "1,30 x 0,60", price: 727375 },
      ],
      images: ["/images/producto/tender-reb-6h.jpg"],
      features: rebatibleFeatures,
      videoUrl: rebatibleVideo
    },
    {
      sku: "tender-reb-4h",
      title: "Tender Rebatible 4H",
      categoryPath: ["Inicio", "Tendederos", "Rebatibles", "Tender Rebatible 4H"],
      priceRange: "$505.301,00",
      description: "Tender de pared rebatible de 4 Hilos: Nuestro modelo de pared más estrecho, optimizado para balcones pequeños y pasillos de servicio.",
      code: "TENDER-REB-4H",
      sizes: [
        { name: "0,70 x 0,30", price: 505301 }, { name: "0,80 x 0,30", price: 505301 }, { name: "0,90 x 0,30", price: 505301 },
        { name: "1,00 x 0,30", price: 505301 }, { name: "1,10 x 0,30", price: 505301 }, { name: "1,20 x 0,30", price: 505301 },
        { name: "1,30 x 0,30", price: 505301 },
      ],
      images: ["/images/producto/tender-reb-4h.jpg"],
      features: rebatibleFeatures,
      videoUrl: rebatibleVideo
    }
  ];
  
  export function getProductBySku(sku: string): Product | undefined {
    return products.find(product => product.sku === sku);
  }