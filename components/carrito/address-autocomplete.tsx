"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Loader2 } from "lucide-react";

import { searchAddress } from "@/actions/usig";
import type { AddressSuggestion } from "@/types/usig";

interface AddressAutocompleteProps {
  onSelect: (suggestion: AddressSuggestion) => void;
}

export default function AddressAutocomplete({ onSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  // Fetch suggestions
  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    searchAddress(debouncedQuery)
      .then((results) => {
        if (cancelled) return;
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setActiveIndex(-1);
      })
      .catch(() => {
        if (!cancelled) setSuggestions([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => { cancelled = true; };
  }, [debouncedQuery]);

  // Click outside → close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(suggestion: AddressSuggestion) {
    setQuery(suggestion.label);
    setIsOpen(false);
    setSuggestions([]);
    onSelect(suggestion);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  const inputBase =
    "w-full bg-gray-50 border border-gray-200 rounded-sm py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)]";

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {isLoading ? (
          <Loader2
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin"
          />
        ) : (
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.trim().length < 3) setIsOpen(false);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (suggestions.length > 0) setIsOpen(true); }}
          placeholder="Buscá tu dirección (ej: Av. Corrientes 1234)"
          className={inputBase}
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-sm shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((s, idx) => (
            <li
              key={`${s.fuente_geo}-${s.calle}-${s.numero}-${s.latitud}-${s.longitud}`}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(s); }}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`px-3 py-2.5 cursor-pointer text-sm border-b border-gray-50 last:border-0 ${
                idx === activeIndex ? "bg-gray-100" : "hover:bg-gray-50"
              }`}
            >
              <span className="block font-medium text-gray-800 truncate">
                {s.direccion_normalizada}
              </span>
              <span className="block text-xs text-gray-400 truncate">
                {[s.ciudad, s.provincia].filter(Boolean).join(", ")}
                {s.codigo_postal ? ` · CP ${s.codigo_postal}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && debouncedQuery.length >= 3 && suggestions.length === 0 && !isOpen && (
        <p className="mt-1 text-xs text-gray-400">
          Sin resultados. Completá la dirección manualmente.
        </p>
      )}
    </div>
  );
}
