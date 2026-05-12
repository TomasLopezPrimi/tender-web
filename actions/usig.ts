"use server";

import type { AddressSuggestion, GeoSource } from "@/types/usig";
import { PROVINCIAS_AR } from "@/types/checkout";

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------
type CacheEntry = { expiresAt: number; data: AddressSuggestion[] };
const CACHE_TTL_MS = 5 * 60 * 1000;
const SEARCH_CACHE = new Map<string, CacheEntry>();

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------
const USIG_NORMALIZAR_URL = "https://servicios.usig.buenosaires.gob.ar/normalizar";
const USIG_REVERSE_URL = "https://servicios.usig.buenosaires.gob.ar/reverseGeo/obtenerDireccion";
const GEOREF_URL = "https://apis.datos.gob.ar/georef/api/direcciones";
const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

// ---------------------------------------------------------------------------
// Province normalization
// Maps common API variants → exact PROVINCIAS_AR enum value
// ---------------------------------------------------------------------------
const PROV_MAP: Record<string, (typeof PROVINCIAS_AR)[number]> = {
  "ciudad autonoma de buenos aires": "Ciudad Autónoma de Buenos Aires",
  "ciudad autónoma de buenos aires": "Ciudad Autónoma de Buenos Aires",
  "caba": "Ciudad Autónoma de Buenos Aires",
  "buenos aires": "Buenos Aires",
  "catamarca": "Catamarca",
  "chaco": "Chaco",
  "chubut": "Chubut",
  "córdoba": "Córdoba",
  "cordoba": "Córdoba",
  "corrientes": "Corrientes",
  "entre ríos": "Entre Ríos",
  "entre rios": "Entre Ríos",
  "formosa": "Formosa",
  "jujuy": "Jujuy",
  "la pampa": "La Pampa",
  "la rioja": "La Rioja",
  "mendoza": "Mendoza",
  "misiones": "Misiones",
  "neuquén": "Neuquén",
  "neuquen": "Neuquén",
  "río negro": "Río Negro",
  "rio negro": "Río Negro",
  "salta": "Salta",
  "san juan": "San Juan",
  "san luis": "San Luis",
  "santa cruz": "Santa Cruz",
  "santa fe": "Santa Fe",
  "santiago del estero": "Santiago del Estero",
  "tierra del fuego": "Tierra del Fuego",
  "tucumán": "Tucumán",
  "tucuman": "Tucumán",
};

function normalizeProvince(raw: string): string {
  const key = raw.trim().toLowerCase();
  return PROV_MAP[key] ?? raw.trim();
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function normalizeQuery(q: string): string {
  return q.trim().replace(/\s+/g, " ");
}

// ---------------------------------------------------------------------------
// USIG — search
// ---------------------------------------------------------------------------
type UsigNormalized = {
  altura: number;
  cod_calle: number;
  cod_partido: string;
  coordenadas?: { srid: number; x: number | string; y: number | string } | null;
  direccion: string;
  nombre_calle: string;
  nombre_localidad: string;
  nombre_partido: string;
  tipo: string;
};

function mapUsigItem(item: UsigNormalized): AddressSuggestion | null {
  const longitud = toNumber(item.coordenadas?.x ?? null);
  const latitud = toNumber(item.coordenadas?.y ?? null);
  if (latitud === null || longitud === null) return null;

  const calle = item.nombre_calle.trim();
  const numero = String(item.altura).trim();
  if (!calle || !numero) return null;

  const ciudad = item.nombre_localidad || item.nombre_partido || "CABA";
  const provinciaRaw =
    item.cod_partido === "caba" ? "Ciudad Autónoma de Buenos Aires" : item.nombre_partido;
  const provincia = normalizeProvince(provinciaRaw);
  const direccionNormalizada = item.direccion.trim() || `${calle} ${numero}`;

  return {
    label: [direccionNormalizada, [ciudad, provincia].filter(Boolean).join(", ")]
      .filter(Boolean)
      .join(" — "),
    calle,
    numero,
    ciudad,
    provincia,
    codigo_postal: undefined,
    latitud,
    longitud,
    fuente_geo: "usig",
    direccion_normalizada: direccionNormalizada,
  };
}

async function searchUsig(query: string): Promise<AddressSuggestion[]> {
  const url = `${USIG_NORMALIZAR_URL}?direccion=${encodeURIComponent(query)}&geocodificar=true&max=8`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const payload = (await res.json()) as { direccionesNormalizadas?: UsigNormalized[] };
    const items = payload.direccionesNormalizadas ?? [];
    const mapped = items.map(mapUsigItem).filter((s): s is AddressSuggestion => s !== null);
    const deduped = new Map<string, AddressSuggestion>();
    for (const s of mapped) {
      deduped.set(`${s.calle}|${s.numero}|${s.latitud}|${s.longitud}`, s);
    }
    return Array.from(deduped.values());
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// GeoRef — search (fallback + CP enrichment)
// ---------------------------------------------------------------------------
async function searchGeoref(query: string): Promise<AddressSuggestion[]> {
  try {
    const url = `${GEOREF_URL}?direccion=${encodeURIComponent(query)}&max=8`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const payload = (await res.json()) as {
      direcciones?: Array<{
        nomenclatura?: string;
        calle?: { nombre?: string };
        altura?: { valor?: number | string };
        localidad_censal?: { nombre?: string; provincia?: { nombre?: string } };
        codigo_postal?: string;
        ubicacion?: { lat?: number; lon?: number };
      }>;
    };
    const items = payload.direcciones ?? [];
    const mapped = items
      .map((item) => {
        const calle = item.calle?.nombre?.trim() ?? "";
        const numero = String(item.altura?.valor ?? "").trim();
        const ciudad = item.localidad_censal?.nombre?.trim() ?? "";
        const provinciaRaw = item.localidad_censal?.provincia?.nombre?.trim() ?? "";
        const provincia = normalizeProvince(provinciaRaw);
        const latitud = toNumber(item.ubicacion?.lat);
        const longitud = toNumber(item.ubicacion?.lon);
        if (!calle || !numero || latitud === null || longitud === null) return null;
        const direccionNormalizada = item.nomenclatura?.trim() || `${calle} ${numero}`;
        return {
          label: [direccionNormalizada, [ciudad, provincia].filter(Boolean).join(", ")]
            .filter(Boolean)
            .join(" — "),
          calle,
          numero,
          ciudad,
          provincia,
          codigo_postal: item.codigo_postal,
          latitud,
          longitud,
          fuente_geo: "georef" as GeoSource,
          direccion_normalizada: direccionNormalizada,
        } satisfies AddressSuggestion;
      })
      .filter((s): s is AddressSuggestion => s !== null);

    const deduped = new Map<string, AddressSuggestion>();
    for (const s of mapped) {
      deduped.set(`${s.calle}|${s.numero}|${s.latitud}|${s.longitud}`, s);
    }
    return Array.from(deduped.values());
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// searchAddress — public server action
// ---------------------------------------------------------------------------
export async function searchAddress(query: string): Promise<AddressSuggestion[]> {
  const normalized = normalizeQuery(query);
  if (normalized.length < 3) return [];

  const cacheKey = normalized.toLowerCase();
  const cached = SEARCH_CACHE.get(cacheKey);
  const now = Date.now();
  if (cached && cached.expiresAt > now) return cached.data;

  const [usig, georef] = await Promise.all([
    searchUsig(normalized).catch(() => [] as AddressSuggestion[]),
    searchGeoref(normalized).catch(() => [] as AddressSuggestion[]),
  ]);

  let results: AddressSuggestion[];
  if (usig.length > 0) {
    // Enrich USIG results with postal codes from GeoRef by nearest coordinate
    const georefWithCP = georef.filter((g) => g.codigo_postal);
    results = usig.map((u) => {
      if (u.codigo_postal || georefWithCP.length === 0) return u;
      let best: AddressSuggestion | null = null;
      let bestDist = Infinity;
      for (const g of georefWithCP) {
        const dist = (g.latitud - u.latitud) ** 2 + (g.longitud - u.longitud) ** 2;
        if (dist < bestDist) { bestDist = dist; best = g; }
      }
      return best ? { ...u, codigo_postal: best.codigo_postal } : u;
    });
  } else {
    results = georef;
  }

  SEARCH_CACHE.set(cacheKey, { data: results, expiresAt: now + CACHE_TTL_MS });
  return results;
}

// ---------------------------------------------------------------------------
// USIG — reverse geocoding
// ---------------------------------------------------------------------------
type UsigReverseResponse = {
  puerta?: {
    nombre_calle?: string;
    altura?: number | string;
    nombre_localidad?: string;
    nombre_partido?: string;
    cod_partido?: string;
    coordenadas?: { x?: number | string; y?: number | string };
  };
};

async function reverseUsig(lat: number, lon: number): Promise<AddressSuggestion | null> {
  try {
    const url = `${USIG_REVERSE_URL}?lat=${lat}&lng=${lon}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const payload = (await res.json()) as UsigReverseResponse;
    const puerta = payload.puerta;
    if (!puerta) return null;

    const calle = puerta.nombre_calle?.trim() ?? "";
    const numero = String(puerta.altura ?? "").trim();
    if (!calle || !numero) return null;

    const ciudad = puerta.nombre_localidad?.trim() || puerta.nombre_partido?.trim() || "CABA";
    const provinciaRaw =
      puerta.cod_partido === "caba" ? "Ciudad Autónoma de Buenos Aires" : (puerta.nombre_partido ?? "");
    const provincia = normalizeProvince(provinciaRaw);
    const longitud = toNumber(puerta.coordenadas?.x ?? lon);
    const latitud2 = toNumber(puerta.coordenadas?.y ?? lat);
    const direccionNormalizada = `${calle} ${numero}`;

    return {
      label: [direccionNormalizada, [ciudad, provincia].filter(Boolean).join(", ")]
        .filter(Boolean)
        .join(" — "),
      calle,
      numero,
      ciudad,
      provincia,
      latitud: latitud2 ?? lat,
      longitud: longitud ?? lon,
      fuente_geo: "usig",
      direccion_normalizada: direccionNormalizada,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Nominatim — reverse geocoding (global fallback)
// ---------------------------------------------------------------------------
type NominatimResponse = {
  address?: {
    road?: string;
    house_number?: string;
    city?: string;
    town?: string;
    village?: string;
    suburb?: string;
    state?: string;
    postcode?: string;
    country_code?: string;
  };
  display_name?: string;
};

async function reverseNominatim(lat: number, lon: number): Promise<AddressSuggestion | null> {
  try {
    const url = `${NOMINATIM_REVERSE_URL}?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
    const res = await fetch(url, {
      cache: "no-store",
      headers: { "User-Agent": "tender-ecommerce/1.0 (contacto@tender.com.ar)" },
    });
    if (!res.ok) return null;
    const payload = (await res.json()) as NominatimResponse;
    const addr = payload.address;
    if (!addr) return null;

    const calle = addr.road?.trim() ?? "";
    const numero = addr.house_number?.trim() ?? "";
    if (!calle) return null;

    const ciudad =
      addr.city?.trim() || addr.town?.trim() || addr.village?.trim() || addr.suburb?.trim() || "";
    const provinciaRaw = addr.state?.trim() ?? "";
    const provincia = normalizeProvince(provinciaRaw);
    const direccionNormalizada = [calle, numero].filter(Boolean).join(" ");

    return {
      label: [direccionNormalizada, [ciudad, provincia].filter(Boolean).join(", ")]
        .filter(Boolean)
        .join(" — "),
      calle,
      numero,
      ciudad,
      provincia,
      codigo_postal: addr.postcode?.trim(),
      latitud: lat,
      longitud: lon,
      fuente_geo: "nominatim",
      direccion_normalizada: direccionNormalizada,
    };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// reverseGeocode — public server action (USIG → Nominatim cascade)
// ---------------------------------------------------------------------------
export async function reverseGeocode(lat: number, lon: number): Promise<AddressSuggestion | null> {
  const [usig, nominatim] = await Promise.all([
    reverseUsig(lat, lon),
    reverseNominatim(lat, lon),
  ]);
  if (!usig) return nominatim;
  return { ...usig, codigo_postal: usig.codigo_postal ?? nominatim?.codigo_postal };
}
