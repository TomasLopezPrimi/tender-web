import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/hooks/use-cart-store";
import { iniciarProcesoDePago } from "@/lib/cart-actions";
import { CartItemReference, CheckoutActionResponse, ClientData, ClientFormValues, clientFormSchema } from "@/types/checkout";

export function useCheckout() {
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      dni: "",
      email: "",
      phone: "",
      usuario_instagram: "",
      address: {
        calle: "",
        numero: "",
        ciudad: "",
        provincia: undefined,
        codigo_postal: "",
        piso: "",
        departamento: "",
        referencias: "",
        es_barrio_privado: false,
      },
    },
    mode: "onTouched",
  });

  type PaymentMethod = "TRANSFERENCIA" | "GETNET-PRESENCIAL" | "GETNET-WEB" | "EFECTIVO";

  
  const handleCheckout = async (paymentMethod: PaymentMethod = "TRANSFERENCIA"): Promise<CheckoutActionResponse | undefined> => {
    if (items.length === 0) return;

    const isValid = await form.trigger();
    if (!isValid) {
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
      return;
    }

    setIsProcessing(true);
    setFormError("");

    try {
      const formValues = form.getValues();
      const clientData: ClientData = {
        ...formValues,
        address: {
          ...formValues.address,
          codigo_postal: formValues.address.codigo_postal ?? "",
        },
      };

      const itemsParaBackend: CartItemReference[] = items.map(item => ({
        sku: item.sku,
        quantity: item.cantidad,
        selectedSize: item.medida
      }));
      
      const clientId = undefined;

      const response = await iniciarProcesoDePago(
        itemsParaBackend,
        paymentMethod, 
        clientId, 
        clientData
      );

      if (response.success) {
        if (response.instruction?.type === 'GETNET_CHECKOUT') {
          // No limpiar carrito ni navegar — el caller abrirá el modal con la URL
          return response;
        }
        
        if (response.instruction?.type === 'EXTERNAL_REDIRECT') {
          window.open(response.instruction.payload.url, '_blank');
          clearCart(); 
          router.push('/gracias');
        } 
        else {
          clearCart();
          router.push('/gracias');
        }
      } else {
        setFormError(response.error || "Hubo un problema al procesar tu pedido.");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error("Error en checkout:", err);
      setFormError("Error de conexión. Intentá nuevamente.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    form,
    formError,
    setFormError,
    isProcessing,
    handleCheckout
  };
}