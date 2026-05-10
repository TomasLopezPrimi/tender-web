export type GeoSource = "usig" | "georef" | "nominatim" | "manual";

export interface AddressSuggestion {
  /** Texto legible para mostrar en la lista de sugerencias */
  label: string;
  calle: string;
  numero: string;
  ciudad: string;
  provincia: string;
  codigo_postal?: string;
  latitud: number;
  longitud: number;
  fuente_geo: GeoSource;
  direccion_normalizada: string;
}
