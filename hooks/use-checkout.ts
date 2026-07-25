import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCartStore } from "@/hooks/use-cart-store";
import { iniciarProcesoDePago } from "@/actions/cart";
import { CartItemReference, CheckoutActionResponse, ClientData, ClientFormValues, clientFormSchema } from "@/types/checkout";
import type { CustomerAddress, CustomerProfile } from "@/types/customer";
import { scrollToFirstError } from "@/lib/checkout-ui";

export interface CheckoutInitialData {
  profile: CustomerProfile;
  addresses: CustomerAddress[];
}

function toDefaultValues(initialData?: CheckoutInitialData | null): ClientFormValues {
  const firstAddress = initialData?.addresses[0];
  return {
    nombre: initialData?.profile.nombre ?? "",
    apellido: initialData?.profile.apellido ?? "",
    dni: initialData?.profile.dni ?? "",
    email: initialData?.profile.email ?? "",
    phone: initialData?.profile.phone ?? "",
    usuario_instagram: initialData?.profile.usuario_instagram ?? "",
    address: {
      calle: firstAddress?.calle ?? "",
      numero: firstAddress?.numero ?? "",
      ciudad: firstAddress?.ciudad ?? "",
      provincia: firstAddress?.provincia ?? "",
      codigo_postal: firstAddress?.codigo_postal ?? "",
      piso: firstAddress?.piso ?? "",
      departamento: firstAddress?.departamento ?? "",
      referencias: firstAddress?.referencias ?? "",
      es_barrio_privado: firstAddress?.es_barrio_privado ?? false,
      latitud: firstAddress?.latitud ?? undefined,
      longitud: firstAddress?.longitud ?? undefined,
      fuente_geo: (firstAddress?.fuente_geo as ClientFormValues["address"]["fuente_geo"]) ?? undefined,
      direccion_normalizada: firstAddress?.direccion_normalizada ?? undefined,
    },
  };
}

export function useCheckout(initialData?: CheckoutInitialData | null) {
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: toDefaultValues(initialData),
    mode: "onTouched",
  });

  type PaymentMethod = "TRANSFERENCIA" | "GETNET-PRESENCIAL" | "GETNET-WEB" | "GETNET-LINK" | "EFECTIVO";

  
  const handleCheckout = async (paymentMethod: PaymentMethod = "TRANSFERENCIA"): Promise<CheckoutActionResponse | undefined> => {
    if (items.length === 0) return;

    const isValid = await form.trigger();
    if (!isValid) {
      setFormError("Revisá los campos marcados en rojo.");
      scrollToFirstError();
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
      
      const response = await iniciarProcesoDePago(
        itemsParaBackend,
        paymentMethod, 
        undefined,
        clientData
      );

      if (response.success) {
        if (response.instruction?.type === 'GETNET_CHECKOUT') {
          // No limpiar carrito ni navegar — el caller abrirá el modal con la URL
          return response;
        }

        if (response.instruction?.type === 'GETNET_LINKS') {
          // No limpiar carrito ni navegar — el caller abrirá el modal con los links
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
