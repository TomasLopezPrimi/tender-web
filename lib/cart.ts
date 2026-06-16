/**
 * cart.ts
 *
 * Helpers puros de totales derivados del carrito.
 * Sin estado ni fetch — seguros para importar desde Client Components.
 */

import { CartItem } from "@/types/products";

export function getTotalItems(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.cantidad, 0);
}

export function getTotalPrice(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}
