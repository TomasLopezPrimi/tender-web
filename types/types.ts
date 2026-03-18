import { Product } from "@/lib/products";

export interface CartItem {
    id: string;
    sku: string;
    nombre: string;
    medida: string;
    precio: number;
    cantidad: number;
  }


  export interface UIProduct extends Product {
    badge?: string;
    badgeColor?: string;
  }