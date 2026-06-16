/**
 * product-detail.ts
 *
 * Funciones puras derivadas de un producto y su medida seleccionada.
 * Sin fetch ni estado — seguro para importar desde Client Components.
 */

/**
 * Calcula el espacio de colgado (en metros) de un tender según el SKU
 * (cantidad de hilos, sufijo `<n>h`) y la medida elegida (`largo x ancho`).
 *
 * Devuelve el valor ya formateado en es-AR, o `null` si no se puede calcular.
 */
export function calcHangingSpace(sku: string, sizeName: string): string | null {
  const threadsMatch = sku.match(/(\d+)h$/i);
  const threads = threadsMatch ? parseInt(threadsMatch[1], 10) : 0;
  if (threads <= 0) return null;

  const lengthStr = sizeName.split("x")[0].trim().replace(",", ".");
  const length = parseFloat(lengthStr);
  if (isNaN(length)) return null;

  const meters = (threads + 1) * (length - 0.08);
  return meters.toLocaleString("es-AR", { minimumFractionDigits: 2 });
}
