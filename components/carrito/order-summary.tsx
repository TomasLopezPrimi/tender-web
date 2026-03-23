import { Truck, Landmark, MessageCircle, Loader2 } from "lucide-react";

interface OrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  isProcessing: boolean;
  onCheckout: () => void;
  formatPrice: (price: number) => string;
}

export default function OrderSummary({ totalItems, totalPrice, isProcessing, onCheckout, formatPrice }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 sticky top-4">
      <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-4 border-b pb-4">Resumen de compra</h2>
      
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-600">Total ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
        <span className="text-2xl font-bold text-[var(--tender-navy-mid)]">{formatPrice(totalPrice)}</span>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-sm p-4 mb-6">
        <div className="flex items-start gap-3">
          <Truck className="text-blue-500 mt-0.5 shrink-0" size={20} />
          <p className="text-sm text-blue-900 leading-relaxed">
            <span className="font-bold block mb-1">Concertar entrega en Tender:</span>
            Contactanos por WhatsApp para coordinar retiro o envío. <br></br>
            Instalación no viene incluida.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-sm p-4 mb-6">
        <div className="flex items-start gap-3 mb-3">
          <Landmark className="text-gray-600 mt-0.5 shrink-0" size={20} />
          <div>
            <span className="font-bold text-sm text-gray-800 block mb-1">Pago por Transferencia</span>
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              Realizá una transferencia y envianos el comprobante para confirmar.
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
        onClick={onCheckout}
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold py-4 px-6 rounded-sm transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <MessageCircle size={20} />}
        {isProcessing ? "Procesando..." : "Confirmar pedido"}
      </button>
      <p className="text-center text-xs text-gray-500 mt-3">
        Tu pedido será procesado de forma segura.
      </p>
    </div>
  );
}