import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useCheckout } from "@/hooks/use-checkout";
import type { CheckoutInitialData } from "@/hooks/use-checkout";
import { useCartStore } from "@/hooks/use-cart-store";
import { getThankYouPath, saveThankYouContext } from "@/lib/thank-you-context";
import { scrollToAddressSection, scrollToFirstError } from "@/lib/checkout-ui";
import { GetnetLinkItem } from "@/types/checkout";

/**
 * Orquesta el checkout del carrito: validación con mensajes específicos de
 * dirección, branching por método de pago y estado de los modales (Getnet web
 * y links de pago). Envuelve a `useCheckout` (form + server action).
 */
export function useCheckoutFlow(initialData?: CheckoutInitialData | null) {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);

  const { form, formError, setFormError, isProcessing, handleCheckout } = useCheckout(initialData);

  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [showGetnetModal, setShowGetnetModal] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [getnetCheckoutUrl, setGetnetCheckoutUrl] = useState<string | null>(null);
  const [getnetOrderId, setGetnetOrderId] = useState<number | null>(null);
  const [showLinksModal, setShowLinksModal] = useState(false);
  const [paymentLinks, setPaymentLinks] = useState<GetnetLinkItem[]>([]);
  const [linksOrderId, setLinksOrderId] = useState<number | undefined>(undefined);

  const closeLinksModal = useCallback(() => setShowLinksModal(false), []);

  // El usuario abandona el pago con tarjeta: cerramos y le dejamos el carrito intacto.
  const closeGetnetModal = useCallback(() => setShowGetnetModal(false), []);

  const handlePaymentLinksCompleted = useCallback(() => {
    setShowLinksModal(false);
    setPaymentLinks([]);
    clearCart();
    router.push(getThankYouPath("getnet-link"));
  }, [clearCart, router]);

  const startCheckout = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errs = form.formState.errors;
      const hasOnlyAddressErrors =
        errs.address &&
        !errs.nombre && !errs.apellido && !errs.dni && !errs.email && !errs.phone;
      if (hasOnlyAddressErrors) {
        setFormError("Completá la dirección de entrega antes de continuar.");
        scrollToAddressSection();
      } else {
        setFormError("Revisá los campos marcados en rojo.");
        scrollToFirstError();
      }
      return;
    }

    if (paymentMethod === "getnet") {
      const response = await handleCheckout("GETNET-WEB");
      if (response?.success && response.instruction?.type === "GETNET_CHECKOUT") {
        saveThankYouContext({
          paymentMethod: "getnet-web",
          orderId: response.orderId ?? null,
          paymentIntentId: response.instruction.payload.paymentIntentId,
        });
        setPaymentIntentId(response.instruction.payload.paymentIntentId);
        setGetnetCheckoutUrl(response.instruction.payload.checkoutUrl);
        setGetnetOrderId(response.orderId ?? null);
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

  return {
    form,
    formError,
    isProcessing,
    paymentMethod,
    setPaymentMethod,
    startCheckout,
    getnetModal: {
      isOpen: showGetnetModal,
      paymentIntentId,
      checkoutUrl: getnetCheckoutUrl,
      orderId: getnetOrderId,
      close: closeGetnetModal,
    },
    linksModal: {
      isOpen: showLinksModal,
      links: paymentLinks,
      orderId: linksOrderId,
      close: closeLinksModal,
      onCompleted: handlePaymentLinksCompleted,
    },
  };
}
