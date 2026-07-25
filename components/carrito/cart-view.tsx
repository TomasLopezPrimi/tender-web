"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useCartStore } from "@/hooks/use-cart-store";
import { useCheckoutFlow } from "@/hooks/use-checkout-flow";
import { isProfessionalCustomer } from "@/lib/customer";
import { formatPrice } from "@/lib/products";
import { getTotalItems, getTotalPrice } from "@/lib/cart";
import { PricingConfig, ProductSize } from "@/types/products";
import type { CustomerAddress, CustomerProfile } from "@/types/customer";

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
  customerData?: { profile: CustomerProfile; addresses: CustomerAddress[] } | null;
}

export default function CartView({ pricingConfig, productSizes, customerData }: CartViewProps) {
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
  } = useCheckoutFlow(customerData);

  const { register, setValue, clearErrors, formState: { errors } } = form;

  const totalItems = getTotalItems(items);
  const totalPrice = getTotalPrice(items);
  const profile = customerData?.profile;
  const professionalDiscount = profile && isProfessionalCustomer(profile.tipo_cliente) && profile.estado_cuenta === "ACTIVO"
    ? Number(profile.descuento_porcentaje ?? 0)
    : 0;

  const applyAddress = (address: CustomerAddress) => {
    setValue("address.calle", address.calle, { shouldValidate: true, shouldDirty: true });
    setValue("address.numero", address.numero, { shouldValidate: true, shouldDirty: true });
    setValue("address.ciudad", address.ciudad, { shouldValidate: true, shouldDirty: true });
    setValue("address.provincia", address.provincia, { shouldValidate: true, shouldDirty: true });
    setValue("address.codigo_postal", address.codigo_postal ?? "", { shouldValidate: true, shouldDirty: true });
    setValue("address.piso", address.piso ?? "", { shouldDirty: true });
    setValue("address.departamento", address.departamento ?? "", { shouldDirty: true });
    setValue("address.referencias", address.referencias ?? "", { shouldDirty: true });
    setValue("address.es_barrio_privado", address.es_barrio_privado, { shouldDirty: true });
    setValue("address.latitud", address.latitud ?? undefined, { shouldDirty: true });
    setValue("address.longitud", address.longitud ?? undefined, { shouldDirty: true });
    const source = ["usig", "georef", "nominatim", "manual"].includes(String(address.fuente_geo))
      ? (address.fuente_geo as "usig" | "georef" | "nominatim" | "manual")
      : "manual";
    setValue("address.fuente_geo", source, { shouldDirty: true });
    setValue("address.direccion_normalizada", address.direccion_normalizada ?? undefined, { shouldDirty: true });
    clearErrors("address");
  };

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
                accountDni={customerData?.profile.dni}
                isLoggedIn={!!customerData}
              />
              <div className="border-t border-gray-100 my-6" />
              {customerData && (
                <div className="mb-5 rounded-sm border border-[var(--tender-cyan)]/20 bg-[var(--tender-cyan)]/5 p-4 text-sm text-[var(--tender-navy-mid)]">
                  <p className="font-semibold">Estás comprando con tu cuenta</p>
                  {!customerData.profile.dni && <p className="mt-2 rounded-sm bg-amber-50 p-2 text-xs font-semibold text-amber-900">Completá tu DNI para poder pagar con tarjeta.</p>}
                  {customerData.addresses.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {customerData.addresses.map((address) => (
                        <button key={address.id_direccion} type="button" onClick={() => applyAddress(address)} className="rounded-full border border-[var(--tender-cyan)]/30 bg-white px-3 py-1 text-xs font-semibold hover:border-[var(--tender-cyan)]">
                          {address.calle} {address.numero}, {address.ciudad}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div id="address-form-section">
                <AddressForm
                  control={form.control}
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
              professionalDiscount={professionalDiscount}
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
