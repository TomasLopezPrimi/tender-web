"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/hooks/use-cart-store";
import { Trash2, ArrowLeft, Truck, Landmark, MessageCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getProductBySku } from "@/lib/products";
import { useRouter } from "next/navigation";

// Formateador de precios
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2
  }).format(price);
};

export default function CarritoPage() {
    const router = useRouter(); // 2. Inicializamos el router
    const [isMounted, setIsMounted] = useState(false);
    
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart); // 3. Traemos la función de limpiar
    const updateItemSize = useCartStore((state) => state.updateItemSize);
  
    const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);
  
    // 4. Actualizamos la función de checkout
    const handleWhatsAppCheckout = () => {
      const numeroTender = "5491131876811"; 
      
      const detallePedido = items.map(
        (item) => `- ${item.cantidad}x ${item.nombre} (${item.medida})`
      ).join("%0A");
  
      const mensaje = `¡Hola Tender! 👋%0AQuiero confirmar mi compra.%0A%0A*Mi pedido:*%0A${detallePedido}%0A%0A*Total a pagar:* ${formatPrice(totalPrice)}%0A%0AEnseguida les envío el comprobante de transferencia.`;
  
      // A. Abrimos WhatsApp en una pestaña nueva
      window.open(`https://wa.me/${numeroTender}?text=${mensaje}`, '_blank');
  
      // B. Vaciamos el carrito
      clearCart();
  
      // C. Redirigimos a la página de éxito en la pestaña actual
      router.push('/gracias');
    };
  
    if (!isMounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-(--tender-cyan) transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Volver a la tienda
          </Link>
          <h1 className="text-3xl font-bold text-(--tender-navy-mid) mt-4">Tu Carrito</h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-sm p-12 text-center shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8">Parece que aún no has agregado ningún tender a tu carrito.</p>
            <Link href="/" className="inline-block bg-(--tender-cyan) text-white font-bold py-3 px-8 rounded-sm hover:bg-[#5bc0c0] transition-colors">
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMNA IZQUIERDA: Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">Productos seleccionados</h2>
                
                <div className="space-y-6">
                  {items.map((item) => {
                    // Buscamos la info completa del producto original
                    const fullProduct = getProductBySku(item.sku);

                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg">{item.nombre}</h3>
                          
                          {/* ACÁ ESTÁ LA MAGIA: El selector de medidas */}
                          <div className="mt-2 flex items-center gap-2">
                            <label htmlFor={`size-${item.id}`} className="text-sm text-gray-500">Medida:</label>
                            {fullProduct ? (
                              <select
                                id={`size-${item.id}`}
                                value={item.medida}
                                onChange={(e) => {
                                  const newSizeName = e.target.value;
                                  // Buscamos el precio correspondiente a esa nueva medida
                                  const newSizeObj = fullProduct.sizes.find(s => s.name === newSizeName);
                                  if (newSizeObj) {
                                    updateItemSize(item.id, newSizeObj.name, newSizeObj.price);
                                  }
                                }}
                                className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-sm py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[var(--tender-cyan)] cursor-pointer"
                              >
                                {fullProduct.sizes.map((size) => (
                                  <option key={size.name} value={size.name}>
                                    {size.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="text-sm font-medium text-gray-700">{item.medida}</span>
                            )}
                          </div>
                          
                          <p className="text-sm text-gray-500 mt-1">Cantidad: {item.cantidad}</p>
                        </div>
                        
                        <div className="flex items-center gap-6 mt-4 sm:mt-0 w-full sm:w-auto justify-between sm:justify-end">
                          <p className="font-bold text-[var(--tender-cyan)] text-lg">
                            {formatPrice(item.precio * item.cantidad)}
                          </p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm"
                          >
                            <Trash2 size={18} />
                            <span className="sm:hidden">Eliminar</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Resumen y Checkout */}
            <div className="space-y-6">
              
              {/* Bloque de Resumen */}
              <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-4 border-b pb-4">Resumen de compra</h2>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                  <span className="text-2xl font-bold text-[var(--tender-navy-mid)]">{formatPrice(totalPrice)}</span>
                </div>

                {/* Info de Entrega */}
                <div className="bg-blue-50/50 border border-blue-100 rounded-sm p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Truck className="text-blue-500 mt-0.5 shrink-0" size={20} />
                    <p className="text-sm text-blue-900 leading-relaxed">
                      <span className="font-bold block mb-1">Concertar entrega en Tender:</span>
                      Contactanos por WhatsApp, al <a href="https://wa.me/5491131876811" target="_blank" rel="noopener noreferrer" className="font-bold underline hover:text-blue-700">11-3187-6811</a> para coordinar el envío o instalación.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Landmark className="text-gray-600 mt-0.5 shrink-0" size={20} />
                    <div>
                      <span className="font-bold text-sm text-gray-800 block mb-1">Pago por Transferencia</span>
                      <p className="text-xs text-gray-600 leading-relaxed mb-3">
                        Para confirmar tu compra, realizá una transferencia a la siguiente cuenta y envianos el comprobante.
                      </p>
                      <div className="bg-white border border-gray-200 p-3 rounded-sm text-xs font-mono text-gray-700">
                        <p><strong>Alias:</strong> TENDER.ARGENTINA</p>
                        <p className="mt-1"><strong>CBU:</strong> 0000000000000000000000</p>
                        <p className="mt-1"><strong>Titular:</strong> Nombre Apellido</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 px-6 rounded-sm transition-all shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} />
                  Confirmar por WhatsApp
                </button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Se abrirá WhatsApp con el detalle de tu pedido.
                </p>
              </div>

            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}