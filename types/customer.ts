export type CustomerType = "CLIENTE" | "PROFESIONAL" | "ARQUITECTO";
export type ProfessionalAccountState = "ACTIVO" | "PENDIENTE_APROBACION" | "RECHAZADO" | "SUSPENDIDO";
export type ProfessionalRubro = "ARQUITECTO" | "DISENADOR_INTERIORISTA" | "INMOBILIARIA" | "CONSTRUCTORA_DESARROLLADORA" | "DECORADOR" | "OTRO";
export type CustomerOrderType = "VENTA" | "SERVICE" | "GARANTIA";

export interface CustomerSummary {
  id_cliente: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo_cliente: CustomerType;
  estado_cuenta: ProfessionalAccountState;
  estudio_empresa?: string | null;
}

export interface CustomerProfile extends CustomerSummary {
  dni?: string | null;
  phone?: string | null;
  usuario_instagram?: string | null;
  email_verificado: boolean;
  descuento_porcentaje?: string | number | null;
  matricula_profesional?: string | null;
  rubro_profesional?: ProfessionalRubro | null;
  cuit?: string | null;
  creation_date: string;
}

export interface CustomerAuthResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  refresh_token: string;
  cliente: CustomerSummary;
}

export interface CustomerTokenResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  refresh_token: string;
}

export interface CustomerAddress {
  id_direccion: number;
  id_cliente: number;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  codigo_postal?: string | null;
  piso?: string | null;
  departamento?: string | null;
  referencias?: string | null;
  es_barrio_privado: boolean;
  latitud?: number | null;
  longitud?: number | null;
  fuente_geo?: "usig" | "georef" | "nominatim" | "manual" | string | null;
  direccion_normalizada?: string | null;
  creation_date: string;
  update_date: string;
}

export interface CustomerEmails {
  primario: string;
  secundarios: string[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

export interface CustomerOrderSummary {
  id_orden: number;
  tipo: CustomerOrderType;
  status: string;
  pagada: boolean;
  origen?: string;
  flujo_logistico?: string | null;
  estado_taller?: string | null;
  subtotal?: string | number | null;
  discount_amount?: string | number | null;
  total_amount?: string | number | null;
  payment_method?: string | null;
  customer_note?: string | null;
  producto_resumen: string;
  fecha: string;
}

export interface CustomerOrderItem {
  id_orden_item?: number;
  id_producto?: string | null;
  id_producto_variante?: string | null;
  sku?: string | null;
  nombre?: string | null;
  medida?: string | null;
  cantidad?: number | null;
  precio_unitario?: string | number | null;
  subtotal?: string | number | null;
  descripcion_problema?: string | null;
  falla_reportada?: string | null;
  costo_reparacion?: string | number | null;
  id_orden_original?: number | null;
}

export interface CustomerOrderVisit {
  id_visita: number;
  fecha: string;
  fecha_programada?: string | null;
  franja_inicio?: string | null;
  franja_fin?: string | null;
  tipo_domicilio: string;
  estado: string;
  motivo_estado?: string | null;
  notas_tecnico?: string | null;
  direccion?: string | null;
  tecnico_nombre?: string | null;
  tecnico_apellido?: string | null;
}

export interface CustomerOrderDetail extends CustomerOrderSummary {
  items: CustomerOrderItem[];
  updated_at?: string | null;
}
