"use client";

import { useEffect } from "react";
import { X, Lock, CreditCard } from "lucide-react";

interface GetnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutUrl: string;
}

export default function GetnetModal({ 
  isOpen, 
  onClose, 
  checkoutUrl,
}: GetnetModalProps) {

  // Prevenir scroll en el body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
      {/* Backdrop oscuro */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />

      {/* Contenedor del Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-md shadow-2xl m-4 animate-fade-in-up flex flex-col" style={{ maxHeight: "90vh" }}>
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-[var(--tender-navy-mid)] transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Header del Modal */}
        <div className="text-center p-6 pb-4 border-b border-gray-100">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)] mb-3">
            <CreditCard size={20} />
          </div>
          <h2 className="text-xl font-bold text-[var(--tender-navy-mid)]">
            Pago Seguro
          </h2>
          <p className="text-[var(--tender-text-muted)] text-xs mt-1 flex items-center justify-center gap-1">
            <Lock size={12} /> Transacción encriptada por Getnet
          </p>
        </div>

        {/* Iframe de Getnet Checkout */}
        <div className="flex-1 min-h-0">
          <iframe
            src={checkoutUrl}
            title="Getnet Checkout"
            className="w-full border-0"
            style={{ height: "65vh" }}
            allow="payment"
          />
        </div>

        <div className="p-3 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            Al procesar el pago aceptás nuestros Términos y Condiciones.
          </p>
        </div>
      </div>
    </div>
  );
}