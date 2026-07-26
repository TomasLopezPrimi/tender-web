export type ThankYouPaymentMethod = "transferencia" | "getnet-link" | "getnet-web";

export interface ThankYouContext {
  paymentMethod: ThankYouPaymentMethod;
  orderId?: number | null;
  paymentIntentId?: string | null;
  savedAt: number;
}

const STORAGE_KEY = "tender-thank-you-context";
const STORAGE_TTL_MS = 30 * 60 * 1000;

const isBrowser = () => typeof window !== "undefined";

/**
 * Ruta de /gracias con el método explícito en la query.
 *
 * Siempre navegar con este helper: sin `paymentMethod` la página cae al contexto
 * guardado en sessionStorage y puede mostrar la variante de un intento anterior
 * (ej. "¡Pago aprobado!" después de una compra por transferencia).
 */
export function getThankYouPath(
  method: ThankYouPaymentMethod,
  orderId?: number | null,
): string {
  const params = new URLSearchParams({ paymentMethod: method });
  if (orderId != null) params.set("orderId", String(orderId));
  return `/gracias?${params.toString()}`;
}

export function saveThankYouContext(
  context: Omit<ThankYouContext, "savedAt">,
): void {
  if (!isBrowser()) return;

  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...context, savedAt: Date.now() }),
  );
}

export function readThankYouContext(): ThankYouContext | null {
  if (!isBrowser()) return null;

  const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue) as Partial<ThankYouContext>;
    if (!parsed.paymentMethod || typeof parsed.savedAt !== "number") {
      clearThankYouContext();
      return null;
    }

    if (Date.now() - parsed.savedAt > STORAGE_TTL_MS) {
      clearThankYouContext();
      return null;
    }

    return {
      paymentMethod: parsed.paymentMethod,
      orderId: parsed.orderId ?? null,
      paymentIntentId: parsed.paymentIntentId ?? null,
      savedAt: parsed.savedAt,
    };
  } catch {
    clearThankYouContext();
    return null;
  }
}

export function clearThankYouContext(): void {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}