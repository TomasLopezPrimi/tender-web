"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapPin, Pencil, CheckCircle2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import type { UseFormRegister, UseFormSetValue, UseFormClearErrors, FieldErrors } from "react-hook-form";

import AddressAutocomplete from "./address-autocomplete";
import { ClientFormValues, PROVINCIAS_AR } from "@/types/checkout";
import type { AddressSuggestion } from "@/types/usig";
import { reverseGeocode } from "@/actions/usig";

// Leaflet must only render on the client
const AddressMap = dynamic(() => import("./address-map"), { ssr: false });

interface AddressFormProps {
  register: UseFormRegister<ClientFormValues>;
  errors: FieldErrors<ClientFormValues>;
  setValue: UseFormSetValue<ClientFormValues>;
  clearErrors: UseFormClearErrors<ClientFormValues>;
}

type Mode = "search" | "confirmed" | "manual";

export default function AddressForm({ register, errors, setValue, clearErrors }: AddressFormProps) {
  const addrErrors = errors.address;

  const [mode, setMode] = useState<Mode>("search");
  const [confirmedLabel, setConfirmedLabel] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [manualOpen, setManualOpen] = useState(false);

  const inputClass = (hasError: boolean) =>
    `w-full bg-gray-50 border rounded-sm py-2 px-3 text-sm focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-300 focus:ring-red-400"
        : "border-gray-200 focus:ring-[var(--tender-cyan)]"
    }`;

  function applyGeoFields(
    suggestion: AddressSuggestion | { latitud: number; longitud: number },
  ) {
    const opts = { shouldDirty: true, shouldValidate: false } as const;
    if ("calle" in suggestion) {
      setValue("address.calle", suggestion.calle, { ...opts, shouldValidate: true });
      setValue("address.numero", suggestion.numero, { ...opts, shouldValidate: true });
      setValue("address.ciudad", suggestion.ciudad, { ...opts, shouldValidate: true });

      const matchedProv = PROVINCIAS_AR.find(
        (p) => p.toLowerCase() === suggestion.provincia.toLowerCase(),
      );
      setValue("address.provincia", matchedProv ?? suggestion.provincia, {
        ...opts,
        shouldValidate: true,
      });

      if (suggestion.codigo_postal) {
        setValue("address.codigo_postal", suggestion.codigo_postal, {
          ...opts,
          shouldValidate: true,
        });
      }

      setValue("address.latitud", suggestion.latitud, opts);
      setValue("address.longitud", suggestion.longitud, opts);
      setValue("address.fuente_geo", suggestion.fuente_geo, opts);
      setValue("address.direccion_normalizada", suggestion.direccion_normalizada, opts);
      setCoords({ lat: suggestion.latitud, lon: suggestion.longitud });
      // Update confirmed label if already in confirmed mode (pin drag confirmed)
      if (mode === "confirmed") {
        setConfirmedLabel(suggestion.label);
      }
    } else {
      setValue("address.latitud", suggestion.latitud, opts);
      setValue("address.longitud", suggestion.longitud, opts);
      setValue("address.fuente_geo", "manual", opts);
      setValue("address.direccion_normalizada", undefined, opts);
      setCoords({ lat: suggestion.latitud, lon: suggestion.longitud });
    }
  }

  function clearGeoFields() {
    const opts = { shouldDirty: true, shouldValidate: false } as const;
    setValue("address.calle", "", opts);
    setValue("address.numero", "", opts);
    setValue("address.ciudad", "", opts);
    setValue("address.codigo_postal", "", opts);
    setValue("address.latitud", undefined, opts);
    setValue("address.longitud", undefined, opts);
    setValue("address.fuente_geo", "manual", opts);
    setValue("address.direccion_normalizada", undefined, opts);
    setCoords(null);
  }

  async function handleAutocompleteSelect(suggestion: AddressSuggestion) {
    applyGeoFields(suggestion);
    setConfirmedLabel(suggestion.label);
    setMode("confirmed");
    setManualOpen(false);
    clearErrors("address");

    if (!suggestion.codigo_postal) {
      const enriched = await reverseGeocode(suggestion.latitud, suggestion.longitud);
      if (enriched?.codigo_postal) {
        setValue("address.codigo_postal", enriched.codigo_postal, { shouldDirty: true, shouldValidate: true });
      }
    }
  }

  function handleReset() {
    clearGeoFields();
    setConfirmedLabel("");
    setMode("search");
    setManualOpen(false);
  }

  function handleEnterManual() {
    clearGeoFields();
    setMode("manual");
    setManualOpen(true);
  }

  const hasAddressErrors = addrErrors && Object.keys(addrErrors).length > 0;
  const addressErrorInHiddenMode =
    hasAddressErrors && (mode === "search" || mode === "confirmed");

  return (
    <div>
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2 mb-4">
        <MapPin size={14} className="text-[var(--tender-cyan)]" />
        Dirección de entrega
      </h3>

      {/* Address error banner for hidden fields */}
      {addressErrorInHiddenMode && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-sm px-3 py-2.5 mb-4">
          <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-xs text-red-600">
            {mode === "search"
              ? "Seleccioná una dirección del buscador para continuar."
              : "Completá los datos de dirección que faltan."}
          </p>
        </div>
      )}

      {/* ── STEP 1: Search ── */}
      {mode === "search" && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Buscá tu dirección
            </label>
            <AddressAutocomplete onSelect={handleAutocompleteSelect} />
          </div>
          <button
            type="button"
            onClick={handleEnterManual}
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 transition-colors"
          >
            ¿No encontrás tu dirección? Ingresala manualmente
          </button>
        </div>
      )}

      {/* ── STEP 2: Confirmed (autocomplete selected) ── */}
      {mode === "confirmed" && (
        <div className="space-y-4">
          {/* Confirmed address pill */}
          <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-sm px-3 py-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 size={15} className="text-green-500 shrink-0" />
              <span className="text-sm text-gray-700 truncate">{confirmedLabel}</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-medium text-[var(--tender-cyan)] hover:opacity-70 transition-opacity ml-3 shrink-0"
            >
              <Pencil size={12} />
              Cambiar
            </button>
          </div>

          {/* Map */}
          <AddressMap
            lat={coords?.lat}
            lon={coords?.lon}
            onLocationChange={applyGeoFields}
          />
        </div>
      )}

      {/* ── STEP 3: Manual entry ── */}
      {mode === "manual" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Ingreso manual de dirección</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[var(--tender-cyan)] hover:opacity-70 transition-opacity"
            >
              ← Volver al buscador
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <label htmlFor="address.calle" className="text-sm font-medium text-gray-700">Calle *</label>
              <input
                type="text" id="address.calle"
                {...register("address.calle")}
                className={inputClass(!!addrErrors?.calle)}
                placeholder="Ej. Av. Corrientes"
              />
              {addrErrors?.calle && <p className="text-xs text-red-500 mt-1">{addrErrors.calle.message}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="address.numero" className="text-sm font-medium text-gray-700">Número *</label>
              <input
                type="text" id="address.numero"
                {...register("address.numero")}
                className={inputClass(!!addrErrors?.numero)}
                placeholder="Ej. 1234"
              />
              {addrErrors?.numero && <p className="text-xs text-red-500 mt-1">{addrErrors.numero.message}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="address.codigo_postal" className="text-sm font-medium text-gray-700">Código Postal *</label>
              <input
                type="text" id="address.codigo_postal"
                {...register("address.codigo_postal")}
                className={inputClass(!!addrErrors?.codigo_postal)}
                placeholder="Ej. 1414 o B1636"
              />
              {addrErrors?.codigo_postal && <p className="text-xs text-red-500 mt-1">{addrErrors.codigo_postal.message}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="address.ciudad" className="text-sm font-medium text-gray-700">Ciudad *</label>
              <input
                type="text" id="address.ciudad"
                {...register("address.ciudad")}
                className={inputClass(!!addrErrors?.ciudad)}
                placeholder="Ej. Buenos Aires"
              />
              {addrErrors?.ciudad && <p className="text-xs text-red-500 mt-1">{addrErrors.ciudad.message}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="address.provincia" className="text-sm font-medium text-gray-700">Provincia *</label>
              <select
                id="address.provincia"
                {...register("address.provincia")}
                className={inputClass(!!addrErrors?.provincia)}
              >
                <option value="" disabled>Seleccioná una provincia</option>
                {PROVINCIAS_AR.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
              {addrErrors?.provincia && <p className="text-xs text-red-500 mt-1">{addrErrors.provincia.message}</p>}
            </div>
          </div>

          {/* Map in pin-only mode */}
          <AddressMap
            lat={coords?.lat}
            lon={coords?.lon}
            onLocationChange={applyGeoFields}
          />
        </div>
      )}

      {/* ── Always visible: supplementary fields ── */}
      {(mode === "confirmed" || mode === "manual") && (
        <div className="mt-5 space-y-4">
          {mode === "confirmed" && (
            <div className="space-y-1">
              <label htmlFor="address.codigo_postal" className="text-sm font-medium text-gray-700">Código Postal *</label>
              <input
                type="text" id="address.codigo_postal"
                {...register("address.codigo_postal")}
                className={inputClass(!!addrErrors?.codigo_postal)}
                placeholder="Ej. 1414 o B1636"
              />
              {addrErrors?.codigo_postal && <p className="text-xs text-red-500 mt-1">{addrErrors.codigo_postal.message}</p>}
            </div>
          )}
          <button
            type="button"
            onClick={() => setManualOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {manualOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            Piso, departamento y otras referencias
          </button>

          {manualOpen && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="address.piso" className="text-sm font-medium text-gray-700">Piso</label>
                <input
                  type="text" id="address.piso"
                  {...register("address.piso")}
                  className={inputClass(false)}
                  placeholder="Ej. 3"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="address.departamento" className="text-sm font-medium text-gray-700">Departamento</label>
                <input
                  type="text" id="address.departamento"
                  {...register("address.departamento")}
                  className={inputClass(false)}
                  placeholder="Ej. A"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label htmlFor="address.referencias" className="text-sm font-medium text-gray-700">Referencias</label>
                <input
                  type="text" id="address.referencias"
                  {...register("address.referencias")}
                  className={inputClass(false)}
                  placeholder="Ej. Portero eléctrico 3A"
                />
              </div>

              <div className="flex items-center gap-3 md:col-span-2">
                <input
                  type="checkbox" id="address.es_barrio_privado"
                  {...register("address.es_barrio_privado")}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--tender-cyan)] focus:ring-[var(--tender-cyan)]"
                />
                <label htmlFor="address.es_barrio_privado" className="text-sm text-gray-700">
                  Es barrio privado / country
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Hidden geo fields */}
      <input type="hidden" {...register("address.latitud", { valueAsNumber: true })} />
      <input type="hidden" {...register("address.longitud", { valueAsNumber: true })} />
      <input type="hidden" {...register("address.fuente_geo")} />
      <input type="hidden" {...register("address.direccion_normalizada")} />
    </div>
  );
}

