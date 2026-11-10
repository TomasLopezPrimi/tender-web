"use server";

import { config } from "@/config";
import { authHeaders, refreshCustomerSession } from "@/lib/account/session";
import {
  CheckoutRequest,
  CheckoutActionResponse,
  CartItemReference,
  ClientData,
  OrderStatus,
} from "@/types/checkout";

const BACKEND_URL = config.BACKEND_URL;
const INTERNAL_API_KEY = config.INTERNAL_API_KEY;

export async function getOrderStatus(
  orderId: number
): Promise<{ status: OrderStatus } | { error: string }> {
  try {
    const res = await fetch(`${BACKEND_URL}/orders/${orderId}/status`, {
      method: "GET",
      headers: { "X-Api-Key": INTERNAL_API_KEY || "" },
      cache: "no-store",
    });
    if (!res.ok) {
      return { error: `No se pudo consultar la orden (HTTP ${res.status})` };
    }
    const data = await res.json();
    return { status: data.status as OrderStatus };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function getTransferReceipt(orderId: number, guestToken?: string) {
  try {
    const customerHeaders = guestToken ? {} : await authHeaders();
    const response = await fetch(`${BACKEND_URL}/orders/${orderId}/transfer-receipt`, {
      headers: { ...customerHeaders, ...(guestToken ? { "X-Transfer-Receipt-Token": guestToken } : {}) },
      cache: "no-store",
    });
    if (!response.ok) return { ok: false as const, error: receiptError(response.status) };
    return { ok: true as const, data: await response.json() as { uploaded: boolean } };
  } catch {
    return { ok: false as const, error: "No pudimos consultar el comprobante. Intentá nuevamente." };
  }
}

export async function uploadTransferReceipt(orderId: number, file: File, guestToken?: string) {
  if (!file.size || file.size > 5 * 1024 * 1024 || !["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
    return { ok: false as const, error: "Elegí un PDF, JPG o PNG de hasta 5 MiB." };
  }
  try {
    const customerHeaders = guestToken ? {} : await authHeaders();
    const body = new FormData();
    body.append("file", file);
    const response = await fetch(`${BACKEND_URL}/orders/${orderId}/transfer-receipt`, {
      method: "POST",
      headers: { ...customerHeaders, ...(guestToken ? { "X-Transfer-Receipt-Token": guestToken } : {}) },
      body,
    });
    if (!response.ok) return { ok: false as const, error: receiptError(response.status) };
    return { ok: true as const, data: await response.json() };
  } catch {
    return { ok: false as const, error: "No pudimos enviar el comprobante. Revisá tu conexión e intentá nuevamente." };
  }
}

function receiptError(status: number) {
  if (status === 401 || status === 403 || status === 404) return "No pudimos validar el acceso a este pedido. Si el enlace venció, escribinos por WhatsApp.";
  if (status === 409) return "Este pedido no admite comprobantes o ya recibió uno.";
  if (status === 400) return "El archivo no es válido o supera el tamaño permitido. Elegí PDF, JPG o PNG de hasta 5 MiB.";
  if (status === 502) return "No pudimos guardar el archivo. Intentá nuevamente más tarde.";
  return "No pudimos completar la operación. Intentá nuevamente.";
}

export async function iniciarProcesoDePago(
  items: CartItemReference[],
  paymentMethod: "TRANSFERENCIA" | "GETNET-PRESENCIAL" | "GETNET-WEB" | "GETNET-LINK" | "EFECTIVO",
  _clientId?: number,
  clientData?: ClientData,
  customerNote?: string,
): Promise<CheckoutActionResponse> {
  if (!clientData) {
    return {
      success: false,
      error: "Faltan los datos del cliente para procesar la orden.",
    };
  }

  try {
    const checkoutData: CheckoutRequest = {
      items: items.map(({ sku, quantity, selectedSize }) => ({ sku, quantity, selectedSize })),
      customerNote: customerNote ? customerNote : "Pedido desde la web",
      client_data: clientData,
      payment_method: paymentMethod,
    };
    const customerAuthHeaders = await authHeaders();

    const postCheckout = (headers: Record<string, string>) => fetch(`${BACKEND_URL}/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": INTERNAL_API_KEY || "",
        ...headers,
      },
      body: JSON.stringify(checkoutData),
    });

    let response = await postCheckout(customerAuthHeaders);
    if (response.status === 401 && customerAuthHeaders.Authorization) {
      const refreshed = await refreshCustomerSession();
      if (refreshed) {
        response = await postCheckout({ Authorization: `Bearer ${refreshed}` });
      }
    }

    if (!response.ok) {
      let errorMsg = "El servidor de pagos no respondió correctamente.";
      try {
        const ct = response.headers.get("content-type") || "";
        if (ct.includes("application/json")) {
          const errorData = await response.json();
          errorMsg = errorData.detail || errorMsg;
        }
      } catch { /* respuesta sin JSON válido, usamos el mensaje genérico */ }
      return { success: false, error: errorMsg };
    }

    const data = await response.json();

    return {
      success: true,
      orderId: data.id_orden,
      transferReceiptToken: data.transfer_receipt_token ?? null,
      instruction: data.instruction,
    };
  } catch (error) {
    console.error("Error en Server Action:", error);
    return {
      success: false,
      error: "No pudimos conectar con el servidor. Revisá tu conexión.",
      debug: process.env.NODE_ENV === "development" ? String(error) : undefined,
    };
  }
}
