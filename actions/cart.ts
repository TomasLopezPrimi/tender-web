"use server";

import { config } from "@/config";
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

export async function iniciarProcesoDePago(
  items: CartItemReference[],
  paymentMethod: "TRANSFERENCIA" | "GETNET-PRESENCIAL" | "GETNET-WEB" | "GETNET-LINK" | "EFECTIVO",
  clientId?: number,
  clientData?: ClientData,
  customerNote?: string,
): Promise<CheckoutActionResponse> {
  if (!clientId && !clientData) {
    return {
      success: false,
      error: "Faltan los datos del cliente para procesar la orden.",
    };
  }

  try {
    const checkoutData: CheckoutRequest = {
      items,
      customerNote: customerNote ? customerNote : "Pedido desde la web",
      client_id: clientId,
      client_data: clientData,
      payment_method: paymentMethod,
    };

    const response = await fetch(`${BACKEND_URL}/orders/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": INTERNAL_API_KEY || "",
      },
      body: JSON.stringify(checkoutData),
    });

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
