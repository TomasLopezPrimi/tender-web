"use server";

import { 
  CheckoutRequest, 
  CheckoutActionResponse, 
  CartItemReference,
  ClientData
} from "@/types/checkout";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

export async function iniciarProcesoDePago(
  items: CartItemReference[],
  clientId?: number,
  clientData?: ClientData,
  customerNote?: string
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
      customerNote: customerNote ? customerNote : "Pedido desde la web" ,
      client_id: clientId,
      client_data: clientData,
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
      const errorData = await response.json();
      return { 
        success: false, 
        error: errorData.detail || "El servidor de pagos no respondió correctamente." 
      };
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