"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useCartStore } from "@/hooks/use-cart-store";
import { useCheckout } from "@/hooks/use-checkout";
import { PricingConfig, ProductSize } from "@/types/products";

interface CartViewProps {
  pricingConfig: PricingConfig;
  productSizes: Record<string, ProductSize[]>;
}

import EmptyCart from "./empty-cart";
import CartItemCard from "./cart-item-card";
import ClientForm from "./client-form";
import AddressForm from "./address-form";
import OrderSummary from "./order-summary";
import PaymentSelector from "./payment-selector";
import GetnetModal from "./getnet-modal";
import PaymentLinksModal from "./payment-links-modal";
import { GetnetLinkItem } from "@/types/checkout";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(price);
};

const getThankYouPath = (method: "transferencia" | "getnet-link" | "getnet-web") =>
  `/gracias?paymentMethod=${method}`;

export default function CartView({ pricingConfig, productSizes }: CartViewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [showGetnetModal, setShowGetnetModal] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState<GetnetLinkItem[]>([]);
  const [linksOrderId, setLinksOrderId] = useState<number | undefined>(undefined);

  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemSize = useCartStore((state) => state.updateItemSize);
  const clearCart = useCartStore((state) => state.clearCart);

  const { 
    form, 
    formError,
    setFormError, 
    isProcessing,
    handleCheckout 
  } = useCheckout();

  const { register, setValue, clearErrors, formState: { errors } } = form;

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Escuchar mensajes del iframe de Getnet (redirect page)
  const handleGetnetMessage = useCallback((event: MessageEvent) => {
    if (event.data?.type === "getnet-payment-result") {
      if (event.data.status === "success") {
        setShowGetnetModal(false);
        setCheckoutUrl(null);
        clearCart();
        router.push(getThankYouPath("getnet-web"));
      } else {
        setShowGetnetModal(false);
        setCheckoutUrl(null);
        setFormError("El pago fue rechazado. Podés intentar nuevamente.");
      }
    }
  }, [clearCart, router, setFormError]);

  const handlePaymentLinksCompleted = useCallback(() => {
    setShowLinksModal(false);
    setPaymentLinks([]);
    clearCart();
    router.push(getThankYouPath("getnet-link"));
  }, [clearCart, router]);

  useEffect(() => {
    window.addEventListener("message", handleGetnetMessage);
    return () => window.removeEventListener("message", handleGetnetMessage);
  }, [handleGetnetMessage]);

  const handleInitiateCheckout = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errs = form.formState.errors;
      const hasOnlyAddressErrors =
        errs.address &&
        !errs.nombre && !errs.apellido && !errs.dni && !errs.email && !errs.phone;
      if (hasOnlyAddressErrors) {
        setFormError("Completá la dirección de entrega antes de continuar.");
        requestAnimationFrame(() => {
          document.getElementById("address-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      } else {
        setFormError("Revisá los campos marcados en rojo.");
        requestAnimationFrame(() => {
          const firstError = document.querySelector<HTMLElement>(".border-red-300");
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            firstError.focus({ preventScroll: true });
          } else {
            document.getElementById("checkout-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }
      return;
    }

    if (paymentMethod === "getnet") {
      const response = await handleCheckout("GETNET-WEB");
      if (response?.success && response.instruction?.type === "GETNET_CHECKOUT") {
        setCheckoutUrl(response.instruction.payload.checkoutUrl);
        setShowGetnetModal(true);
      }
    } else if (paymentMethod === "getnet-link") {
      const response = await handleCheckout("GETNET-LINK");
      if (response?.success && response.instruction?.type === "GETNET_LINKS") {
        setPaymentLinks(response.instruction.payload.links);
        setLinksOrderId(response.orderId ?? undefined);
        setShowLinksModal(true);
      }
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
              onCheckout={handleInitiateCheckout}
              selectedPaymentMethod={paymentMethod}
              formatPrice={formatPrice}
              pricingConfig={pricingConfig}
            />
          </div>

        </div>
      )}

      {/* MODAL DE GETNET */}
      {checkoutUrl && (
        <GetnetModal
          isOpen={showGetnetModal}
          onClose={() => {
            setShowGetnetModal(false);
            setCheckoutUrl(null);
          }}
          checkoutUrl={checkoutUrl}
        />
      )}

      {/* MODAL DE LINKS DE PAGO (GETNET-LINK) */}
      <PaymentLinksModal
        isOpen={showLinksModal}
        onClose={() => setShowLinksModal(false)}
        onAllLinksOpened={handlePaymentLinksCompleted}
        links={paymentLinks}
        orderId={linksOrderId}
        pricingConfig={pricingConfig}
      />
    </div>
  );
}