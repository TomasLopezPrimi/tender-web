export interface ClientData {
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  phone: string;
  usuario_instagram?: string | null;
  secondary_fullnames?: string[] | null;
  secondary_emails?: string[] | null;
  secondary_phones?: string[] | null;
}

export interface CheckoutRequest {
  items: CartItemReference[];
  customerNote?: string;
  client_id?: number | null;
  client_data?: ClientData | null;
}

export interface CartItemReference {
  sku: string;
  quantity: number;
  selectedSize: string; 
}


export type PaymentProvider = 'WHATSAPP' | 'GETNET' 


export type PaymentInstruction = 
  | {
      type: 'EXTERNAL_REDIRECT';
      provider: 'WHATSAPP';
      payload: { url: string };
    }
  | {
      type: 'SDK_LIGHTBOX';
      provider: 'GETNET';
      payload: {
        token: string;      // session token generado por Santander
        amount: number;
        publicKey: string;
        orderId: string;
      };
    };


export interface CheckoutActionResponse {
  success: boolean;
  orderId?: string;           // Generado por FastAPI
  instruction?: PaymentInstruction;
  error?: string;             // Mensaje amigable para el usuario
  debug?: string;             // Solo para desarrollo
}


export type OrderStatus = 'PENDIENTE' | 'ESPERANDO_CONFIRMACION_PAGO' | 'PAGADA' | 'CANCELADA' 

export interface OrderItemDetail extends CartItemReference {
    nombre: string;
    precioUnitario: number;
    subtotal: number;
  }
  
  export interface OrderDetails {
    id: string;
    items: OrderItemDetail[]; // Mucho mejor que any[]
    total: number;
    status: OrderStatus;
    createdAt: string;
  }