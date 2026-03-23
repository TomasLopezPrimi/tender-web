import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/use-cart-store";
import { iniciarProcesoDePago } from "@/lib/cart-actions";
import { CartItemReference, ClientData } from "@/types/checkout";

export function useCheckout() {
  const router = useRouter();
  
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");
  const [clientForm, setClientForm] = useState<ClientData>({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    phone: "",
    usuario_instagram: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientForm(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const validateForm = () => {
    if (!clientForm.nombre.trim() || !clientForm.apellido.trim()) return "Por favor ingresá tu nombre y apellido.";
    if (!clientForm.dni.trim() || clientForm.dni.length < 7) return "Por favor ingresá un DNI válido.";
    if (!clientForm.email.trim() || !/^\S+@\S+\.\S+$/.test(clientForm.email)) return "Por favor ingresá un email válido.";
    if (!clientForm.phone.trim() || clientForm.phone.length < 6) return "Por favor ingresá un número de teléfono válido.";
    return null;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    try {
      const itemsParaBackend: CartItemReference[] = items.map(item => ({
        sku: item.sku,
        quantity: item.cantidad,
        selectedSize: item.medida
      }));
    const paymentMethod = "TRANSFERENCIA"  // por ahora el único
    const clientId = undefined // por ahora no contamos con id de cliente, a futuro podría estar si hacemos login


      const response = await iniciarProcesoDePago(
        itemsParaBackend,
        paymentMethod, 
        clientId, 
        clientForm
      );

      if (response.success && response.instruction) {
        if (response.instruction.type === 'EXTERNAL_REDIRECT') {
          window.open(response.instruction.payload.url, '_blank');
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
    clientForm,
    formError,
    isProcessing,
    handleInputChange,
    handleCheckout
  };
}