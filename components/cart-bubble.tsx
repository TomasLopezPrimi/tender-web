"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingCart, X, Trash2 } from "lucide-react"; // Usamos tus íconos de Lucide
import Link from "next/link";

// Función para formatear el precio al estilo argentino
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    // Si es un número entero (ej: 100000), no muestra decimales. 
    // Si tiene centavos (ej: 100000.86), muestra 2.
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2, 
    maximumFractionDigits: 2
  }).format(price);
};

export default function CartBubble() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const items = useCartStore((state) => state.items);
  // Traemos la función para eliminar productos del estado global
  const removeItem = useCartStore((state) => state.removeItem);

  // Calculamos la cantidad total y el precio total
  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Si el usuario elimina el último ítem estando el panel abierto, lo cerramos
  useEffect(() => {
    if (totalItems === 0) {
      setIsOpen(false);
    }
  }, [totalItems]);

  if (!isMounted || totalItems === 0) {
    return null;
  }

  return (
    <div className="relative z-50">
      {/* BOTÓN FLOTANTE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 flex h-16 w-16 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-[var(--tender-navy-mid)]' : 'bg-[var(--tender-cyan)]'
        }`}
        aria-label="Abrir carrito"
      >
        <ShoppingCart size={28} strokeWidth={1.5} />

        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm ring-2 ring-white">
          {totalItems}
        </span>
      </button>

      {/* PANEL DEL CARRITO */}
      {isOpen && (
        <div className="fixed bottom-28 left-6 w-[340px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 animate-fade-in overflow-hidden">
          
          {/* Header del Carrito */}
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 p-4">
            <h3 className="flex items-center gap-2 text-lg font-bold text-[var(--tender-navy-mid)]">
              <ShoppingCart size={20} className="text-[var(--tender-cyan)]" />
              Tu Carrito
            </h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col">
            {/* Lista de productos */}
            <div className="max-h-64 overflow-y-auto p-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3 shadow-sm transition-colors hover:border-gray-200">
                    
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="font-bold text-[var(--tender-navy-mid)] text-sm leading-tight mb-1">{item.nombre}</p>
                        <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded-sm">{item.medida}</p>
                      </div>
                      
                      {/* Botón Eliminar */}
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-1">
                      <p className="text-xs font-medium text-gray-500">Cant: {item.cantidad}</p>
                      <p className="font-bold text-[var(--tender-cyan)]">
                        {formatPrice(item.precio * item.cantidad)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Footer con Total y Checkout */}
            <div className="border-t border-gray-100 bg-gray-50 p-4">
              <div className="mb-4 flex items-end justify-between">
                <span className="text-sm font-medium text-gray-600">Total:</span>
                <span className="text-xl font-bold text-[var(--tender-navy-mid)]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link 
                className="w-full flex items-center justify-center gap-2 rounded-sm bg-[var(--tender-cyan)] py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-[#5bc0c0] hover:shadow-lg active:scale-[0.98]"
                href="/carrito"
                onClick={() => setIsOpen(false)}
                >
                IR A PAGAR
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}