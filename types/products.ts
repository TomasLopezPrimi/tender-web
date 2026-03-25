// import { Product } from "@/lib/products";

export interface CartItem {
    id: string;
    sku: string;
    nombre: string;
    medida: string;
    precio: number;
    cantidad: number;
  }


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

  export interface UIProduct extends Product {
    badge?: string;
    badgeColor?: string;
  }
