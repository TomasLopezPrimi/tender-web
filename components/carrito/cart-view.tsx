"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useCartStore } from "@/hooks/use-cart-store";
import { useCheckout } from "@/hooks/use-checkout";

import EmptyCart from "./empty-cart";
import CartItemCard from "./cart-item-card";
import ClientForm from "./client-form";
import OrderSummary from "./order-summary";
// Importamos los dos componentes nuevos que creamos
import PaymentSelector from "./payment-selector";
import GetnetModal from "./getnet-modal";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(price);
};

export default function CartView() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Estados para manejar el flujo multi-pago
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [showGetnetModal, setShowGetnetModal] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemSize = useCartStore((state) => state.updateItemSize);

  // Extraemos las nuevas funciones del useCheckout actualizado
  const { 
    clientForm, 
    formError,
    setFormError, 
    isProcessing,
    validateForm, 
    handleInputChange, 
    handleCheckout 
  } = useCheckout();

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Función interceptora para el botón "Pagar"
  const handleInitiateCheckout = () => {
    // 1. Validamos que el form esté completo antes de avanzar
    const error = validateForm();
    if (error) {
      setFormError(error);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 2. Si todo está bien, derivamos el flujo según el método
    if (paymentMethod === "getnet") {
      setShowGetnetModal(true);
    } else {
      handleCheckout("TRANSFERENCIA"); 
    }
  };

  if (!isMounted) return null;

  return (
    <div className="animate-fade-in relative">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[var(--tender-cyan)] transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Volver a la tienda
        </Link>
      </div>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLUMNA IZQUIERDA: PRODUCTOS, DATOS Y PAGO */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* LISTA DE PRODUCTOS */}
            <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">Productos seleccionados</h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItemCard 
                    key={item.id} 
                    item={item} 
                    onRemove={removeItem}
                    onUpdateSize={updateItemSize}
                    formatPrice={formatPrice}
                  />
                ))}
              </div>
            </div>

            {/* FORMULARIO DE CLIENTE */}
            <ClientForm 
              formData={clientForm} 
              onChange={handleInputChange} 
              error={formError} 
            />

            {/* SELECTOR DE MÉTODO DE PAGO */}
            <PaymentSelector 
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
            />
          </div>

          {/* COLUMNA DERECHA: RESUMEN DE COMPRA */}
          <div className="space-y-6">
            <OrderSummary 
              totalItems={totalItems}
              totalPrice={totalPrice}
              isProcessing={isProcessing}
              // Le pasamos la función interceptora y el método elegido
              onCheckout={handleInitiateCheckout}
              selectedPaymentMethod={paymentMethod}
              formatPrice={formatPrice}
            />
          </div>

        </div>
      )}

      {/* MODAL DE GETNET (Solo se renderiza si es necesario) */}
      <GetnetModal 
        isOpen={showGetnetModal}
        onClose={() => setShowGetnetModal(false)}
        totalPrice={totalPrice}
        // Cuando Getnet confirme, ejecutamos el checkout real pasando "GETNET"
        onPaymentSuccess={() => handleCheckout("GETNET-WEB")} 
      />
    </div>
  );
}