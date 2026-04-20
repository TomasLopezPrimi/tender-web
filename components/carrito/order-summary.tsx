import { Truck, MessageCircle, Loader2, CreditCard, Lock } from "lucide-react";
import { config } from "@/config";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  isProcessing: boolean;
  onCheckout: () => void;
  formatPrice: (price: number) => string;
  selectedPaymentMethod: string; 
}

export default function OrderSummary({ 
  totalItems, 
  totalPrice, 
  isProcessing, 
  onCheckout, 
  formatPrice,
  selectedPaymentMethod 
}: OrderSummaryProps) {

  const isTransferencia = selectedPaymentMethod === "transferencia";

  const totalPriceWithDiscount = totalPrice * config.descuentoTransferencia  // descuentoTransferencia es 0.85

  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 sticky top-4 animate-fade-in-up">
      <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-4 border-b pb-4">
        Resumen de compra
      </h2>
      
      {/* <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
        <span className="text-2xl font-bold text-[var(--tender-navy-mid)]">{formatPrice(totalPrice)}</span>
      </div> */}
      <div className="flex justify-between items-end mb-6">
  <span className="text-gray-600 pb-1">Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
  
  <div className="flex flex-col items-end">
    {isTransferencia ? (
      <>
        {/* Precio original tachado */}
        <span className="text-sm text-gray-400 line-through leading-none mb-1">
          {formatPrice(totalPrice)}
        </span>
        {/* Precio con descuento resaltado */}
        <div className="flex flex-col items-end">
          <span className="text-3xl font-black text-[var(--tender-navy-mid)] leading-none">
            {formatPrice(totalPriceWithDiscount)}
          </span>
          <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1 animate-pulse">
            {Math.round((1 - config.descuentoTransferencia) * 100)}% OFF PAGANDO POR TRANSFERENCIA
          </span>
        </div>
      </>
    ) : (
      /* Precio estándar sin transferencia */
      <span className="text-2xl font-bold text-[var(--tender-navy-mid)]">
        {formatPrice(totalPrice)}
      </span>
    )}
  </div>
</div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-sm p-4 mb-6">
        <div className="flex items-start gap-3">
          <Truck className="text-blue-500 mt-0.5 shrink-0" size={20} />
          <div className="text-sm text-blue-900 leading-relaxed">
            <span className="font-bold block mb-1">Entrega personalizada:</span>
            <p>Coordinaremos el método de envío más económico para vos por WhatsApp.</p>
            <p className="mt-2 text-[11px] opacity-75">* La instalación y el costo de envío no están incluidos en el total.</p>
          </div>
        </div>
      </div>

      {/* BOTÓN DE CHECKOUT DINÁMICO */}
      <button 
        onClick={onCheckout}
        disabled={isProcessing}
        className={`
          w-full group flex items-center justify-center gap-3 
          text-white font-extrabold text-sm uppercase tracking-wider 
          py-4 px-6 rounded-sm transition-all duration-300 ease-in-out
          
          ${isTransferencia 
            ? `/* Estilos WhatsApp */
               bg-gradient-to-b from-[#34E073] to-[#25D366]
               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]
               shadow-[0_4px_14px_0_rgba(37,211,102,0.3)]
               hover:from-[#2ae16f] hover:to-[#1ebd5e]
               hover:shadow-[0_6px_20px_0_rgba(37,211,102,0.5)]` 
            : `/* Estilos Getnet (Tender Navy) */
               bg-[var(--tender-navy)]
               shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]
               shadow-[0_4px_14px_0_rgba(0,0,0,0.2)]
               hover:bg-[var(--tender-navy-mid)]
               hover:shadow-[0_6px_20px_0_rgba(0,0,0,0.3)]`
          }

          hover:-translate-y-0.5 
          active:translate-y-0 active:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.1)] 
          disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none
        `}
      >
        {isProcessing ? (
          <Loader2 className="animate-spin" size={20} />
        ) : isTransferencia ? (
          <MessageCircle size={20} className="group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <CreditCard size={20} className="group-hover:scale-110 transition-transform duration-300" />
        )}

        <span className="relative top-[1px]">
          {isProcessing ? "Procesando..." : isTransferencia ? "Confirmar por WhatsApp" : "Pagar con Tarjeta"}
        </span>
      </button>
      
      {/* TEXTO LEGAL DINÁMICO */}
      <div className="text-center text-[11px] text-gray-500 mt-4 leading-tight animate-fade-in">
        {isTransferencia ? (
          <p>Al confirmar, te redirigiremos a WhatsApp para que nos envíes el <b>comprobante de transferencia</b> y coordinemos la entrega.</p>
        ) : (
          <p className="flex items-center justify-center gap-1">
            <Lock size={10} /> Serás redirigido a una plataforma de pago segura.
          </p>
        )}
      </div>
    </div>
  );
}