"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useCartStore } from "@/hooks/use-cart-store";
import { useCheckoutFlow } from "@/hooks/use-checkout-flow";
import { formatPrice } from "@/lib/products";
import { getTotalItems, getTotalPrice } from "@/lib/cart";
import { PricingConfig, ProductSize } from "@/types/products";

import EmptyCart from "./empty-cart";
import CartItemCard from "./cart-item-card";
import ClientForm from "./client-form";
import AddressForm from "./address-form";
import OrderSummary from "./order-summary";
import PaymentSelector from "./payment-selector";
import GetnetCheckout from "./getnet-modal";
import PaymentLinksModal from "./payment-links-modal";

interface CartViewProps {
  pricingConfig: PricingConfig;
  productSizes: Record<string, ProductSize[]>;
}

export default function CartView({ pricingConfig, productSizes }: CartViewProps) {
  const [isMounted, setIsMounted] = useState(false);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemSize = useCartStore((state) => state.updateItemSize);

  const {
    form,
    formError,
    isProcessing,
    paymentMethod,
    setPaymentMethod,
    startCheckout,
    getnetModal,
    linksModal,
  } = useCheckoutFlow();

  const { register, setValue, clearErrors, formState: { errors } } = form;

  const totalItems = getTotalItems(items);
  const totalPrice = getTotalPrice(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

            {/* ① LISTA DE PRODUCTOS */}
            <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">
                <span className="text-[var(--tender-cyan)] mr-1.5">①</span>Productos seleccionados
              </h2>
              <div className="space-y-6">
                {items.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onUpdateSize={updateItemSize}
                    formatPrice={formatPrice}
                    availableSizes={productSizes[item.sku]}
                  />
                ))}
              </div>
            </div>

            {/* ② SELECTOR DE MÉTODO DE PAGO */}
            <PaymentSelector
              selectedMethod={paymentMethod}
              onSelectMethod={setPaymentMethod}
              pricingConfig={pricingConfig}
              cartItems={items}
            />

            {/* ③ DATOS PERSONALES Y DIRECCIÓN UNIFICADOS */}
            <div id="checkout-form-section" className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 animate-fade-in-up">
              <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">
                <span className="text-[var(--tender-cyan)] mr-1.5">③</span>Tus datos y dirección de envío
              </h2>
              <ClientForm
                register={register}
                errors={errors}
                serverError={formError}
              />
              <div className="border-t border-gray-100 my-6" />
              <div id="address-form-section">
                <AddressForm
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  clearErrors={clearErrors}
                />
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: RESUMEN DE COMPRA */}
          <div className="space-y-6">
            <OrderSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              isProcessing={isProcessing}
              onCheckout={startCheckout}
              selectedPaymentMethod={paymentMethod}
              formatPrice={formatPrice}
              pricingConfig={pricingConfig}
            />
          </div>

        </div>
      )}

      {/* GETNET WEB CHECKOUT (lightbox del loader oficial) */}
      {getnetModal.isOpen && getnetModal.paymentIntentId && (
        <GetnetCheckout isOpen paymentIntentId={getnetModal.paymentIntentId} />
      )}

      {/* MODAL DE LINKS DE PAGO (GETNET-LINK) */}
      <PaymentLinksModal
        isOpen={linksModal.isOpen}
        onClose={linksModal.close}
        onAllLinksOpened={linksModal.onCompleted}
        links={linksModal.links}
        orderId={linksModal.orderId}
        pricingConfig={pricingConfig}
      />
    </div>
  );
}
