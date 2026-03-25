"use client";

import { useEffect } from "react";
import { X, Lock, CreditCard } from "lucide-react";

interface GetnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalPrice: number;
  onPaymentSuccess: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(price);
};

export default function GetnetModal({ 
  isOpen, 
  onClose, 
  totalPrice, 
  onPaymentSuccess 
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
      <div className="relative w-full max-w-lg bg-white rounded-md shadow-2xl p-6 md:p-8 m-4 animate-fade-in-up">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[var(--tender-navy-mid)] transition-colors rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Header del Modal */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)] mb-4">
            <CreditCard size={24} />
          </div>
          <h2 className="text-2xl font-bold text-[var(--tender-navy-mid)]">
            Pago Seguro
          </h2>
          <div className="gold-line mt-3 mb-2"></div>
          <p className="text-[var(--tender-text-muted)] text-sm mt-2 flex items-center justify-center gap-1">
            <Lock size={14} /> Transacción encriptada por Getnet
          </p>
        </div>

        {/* Resumen a pagar */}
        <div className="bg-[var(--tender-gray-bg)] p-4 rounded-md mb-6 flex justify-between items-center border border-gray-100">
          <span className="font-medium text-[var(--tender-text-dark)]">Total a pagar:</span>
          <span className="text-xl font-bold text-[var(--tender-navy-mid)]">
            {formatPrice(totalPrice)}
          </span>
        </div>

        {/* ÁREA DE GETNET (Placeholder) */}
        <div className="min-h-[300px] border-2 border-dashed border-gray-200 rounded-md flex flex-col items-center justify-center p-6 mb-6 bg-gray-50">
          <p className="text-[var(--tender-text-muted)] text-center text-sm mb-4">
            Aquí se inyectará el iframe o el formulario de la pasarela de Getnet.
          </p>
          
          {/* Botón SIMULADOR - Eliminar en producción */}
          <button 
            onClick={() => {
              // Simulamos que Getnet respondió "Pago Exitoso"
              onPaymentSuccess();
              onClose();
            }}
            className="px-4 py-2 bg-[var(--tender-navy)] text-white text-sm font-medium rounded-md hover:bg-[var(--tender-cyan)] transition-colors"
          >
            Simular Pago Exitoso
          </button>
        </div>

        <p className="text-xs text-center text-gray-400">
          Al procesar el pago aceptas nuestros Términos y Condiciones.
        </p>
      </div>
    </div>
  );
}