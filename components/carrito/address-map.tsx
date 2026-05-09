"use client";

import "leaflet/dist/leaflet.css";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import L from "leaflet";
import { Loader2 } from "lucide-react";

import { reverseGeocode } from "@/actions/usig";
import type { AddressSuggestion } from "@/types/usig";
import { MapPin, Check } from "lucide-react";

// Fix Leaflet default icon broken by webpack/Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Default center: Plaza de Mayo, CABA
const DEFAULT_CENTER: [number, number] = [-34.6083, -58.3712];
const DEFAULT_ZOOM = 15;

interface AddressMapProps {
  lat?: number | null;
  lon?: number | null;
  onLocationChange: (result: AddressSuggestion | { latitud: number; longitud: number }) => void;
}

// Inner component: recenter map when lat/lon props change
function RecenterOnChange({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom(), { animate: true });
  }, [lat, lon, map]);
  return null;
}

// Inner component: draggable marker
function DraggableMarker({
  position,
  onDragEnd,
}: {
  position: [number, number];
  onDragEnd: (lat: number, lon: number) => void;
}) {
  const markerRef = useRef<LeafletMarker | null>(null);

  useMapEvents({});

  return (
    <Marker
      position={position}
      draggable
      ref={markerRef}
      eventHandlers={{
        dragend() {
          const marker = markerRef.current;
          if (marker) {
            const { lat, lng } = marker.getLatLng();
            onDragEnd(lat, lng);
          }
        },
      }}
    />
  );
}

type Pending =
  | { type: "suggestion"; result: AddressSuggestion }
  | { type: "coords"; lat: number; lon: number }
  | null;

export default function AddressMap({ lat, lon, onLocationChange }: AddressMapProps) {
  const hasCoords = lat != null && lon != null;
  const center: [number, number] = hasCoords ? [lat, lon] : DEFAULT_CENTER;

  const [markerPos, setMarkerPos] = useState<[number, number]>(center);
  const [isReversing, setIsReversing] = useState(false);
  const [pending, setPending] = useState<Pending>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  // Sync marker when external coords change (e.g. autocomplete selection)
  useEffect(() => {
    if (lat != null && lon != null) {
      setMarkerPos([lat, lon]);
      setPending(null);
    }
  }, [lat, lon]);

  async function handleDragEnd(newLat: number, newLon: number) {
    setMarkerPos([newLat, newLon]);
    setPending(null);
    setIsReversing(true);
    try {
      const result = await reverseGeocode(newLat, newLon);
      if (result) {
        setPending({ type: "suggestion", result });
      } else {
        setPending({ type: "coords", lat: newLat, lon: newLon });
      }
    } catch {
      setPending({ type: "coords", lat: newLat, lon: newLon });
    } finally {
      setIsReversing(false);
    }
  }

  function handleConfirm() {
    if (!pending) return;
    if (pending.type === "suggestion") {
      onLocationChange(pending.result);
    } else {
      onLocationChange({ latitud: pending.lat, longitud: pending.lon });
    }
    setPending(null);
  }

  const pendingLabel =
    pending?.type === "suggestion"
      ? pending.result.label
      : pending?.type === "coords"
      ? `${pending.lat.toFixed(5)}, ${pending.lon.toFixed(5)}`
      : null;

  return (
    <div className="relative rounded-sm overflow-hidden border border-gray-200">
      <MapContainer
        center={markerPos}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-64 w-full z-0"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={markerPos} onDragEnd={handleDragEnd} />
        {hasCoords && <RecenterOnChange lat={lat} lon={lon} />}
      </MapContainer>

      {/* Footer */}
      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        {isReversing ? (
          <span className="flex items-center gap-1.5">
            <Loader2 size={12} className="animate-spin" />
            Obteniendo dirección…
          </span>
        ) : pending ? (
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 min-w-0 text-gray-600">
              <MapPin size={12} className="shrink-0 text-amber-500" />
              <span className="truncate">{pendingLabel}</span>
            </span>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex items-center gap-1 shrink-0 bg-[var(--tender-cyan)] text-white font-medium rounded-sm px-2.5 py-1 hover:opacity-80 transition-opacity"
            >
              <Check size={11} />
              Usar esta ubicación
            </button>
          </div>
        ) : (
          <span>Arrastrá el pin para ajustar tu ubicación exacta</span>
        )}
      </div>
    </div>
  );
}
