import { z } from "zod";

export const PROVINCIAS_AR = [
  "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Ciudad Autónoma de Buenos Aires",
  "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja",
  "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
  "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
] as const;

export const clientFormSchema = z.object({
  nombre: z.string().min(1, "Ingresá tu nombre."),
  apellido: z.string().min(1, "Ingresá tu apellido."),
  dni: z.string().min(6, "Ingresá un DNI válido.").max(10, "Ingresá un DNI válido."),
  email: z.string().email("Ingresá un email válido."),
  phone: z.string().min(6, "Ingresá un teléfono válido."),
  usuario_instagram: z.string().nullable().optional(),
  address: z.object({
    calle: z.string().min(1, "Ingresá la calle."),
    numero: z.string().min(1, "Ingresá el número."),
    ciudad: z.string().min(1, "Ingresá la ciudad."),
    provincia: z.enum(PROVINCIAS_AR, { errorMap: () => ({ message: "Seleccioná una provincia válida." }) }),
    codigo_postal: z.string()
      .min(4, "El código postal debe tener al menos 4 caracteres.")
      .max(8, "El código postal es demasiado largo.")
      .regex(/^[A-Za-z]?\d{4}[A-Za-z]{0,3}$/, "Código postal inválido (ej: 1414 o B1636)."),
    piso: z.string().nullable().optional(),
    departamento: z.string().nullable().optional(),
    referencias: z.string().nullable().optional(),
    es_barrio_privado: z.boolean().optional(),
  }),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;

export interface AddressData {
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  codigo_postal: string;
  piso?: string | null;
  departamento?: string | null;
  referencias?: string | null;
  es_barrio_privado?: boolean;
}

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
  address: AddressData;
}

export interface CheckoutRequest {
  items: CartItemReference[];
  customerNote?: string;
  client_id?: number | null;
  client_data?: ClientData | null;
  payment_method: "TRANSFERENCIA" | "GETNET-PRESENCIAL" | "GETNET-WEB" | "EFECTIVO"
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
      type: 'GETNET_CHECKOUT';
      provider: 'GETNET';
      payload: {
        checkoutUrl: string;
      };
    };


export interface CheckoutActionResponse {
  success: boolean;
  orderId?: number;
  instruction?: PaymentInstruction;
  error?: string;
  debug?: string;
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