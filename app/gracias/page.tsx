import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { CheckCircle2, MessageCircle, ArrowLeft } from "lucide-react";

export default function GraciasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12 animate-fade-in">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl w-full text-center">
          
          {/* Ícono de éxito animado */}
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle2 size={64} className="text-green-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[var(--tender-navy-mid)] mb-4">
            ¡Tu pedido está en marcha!
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Se ha abierto una pestaña con WhatsApp para que nos envíes el detalle de tu compra. 
            No olvides adjuntar el <strong className="text-gray-800">comprobante de transferencia</strong> para que podamos confirmar el pago y coordinar la entrega o instalación.
          </p>

          <div className="bg-blue-50/50 border border-blue-100 rounded-sm p-6 mb-10 text-left">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <MessageCircle size={20} className="text-blue-500" />
              ¿Cerraste WhatsApp por accidente?
            </h3>
            <p className="text-sm text-blue-800 mb-3">
              No te preocupes, podés escribirnos directamente haciendo clic en el botón de abajo y adjuntar tu comprobante manualmente.
            </p>
            <a 
              href="https://wa.me/5491131876811" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 underline transition-colors"
            >
              Abrir chat de WhatsApp
            </a>
          </div>

          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[var(--tender-cyan)] hover:bg-[#5bc0c0] text-white font-bold py-4 px-8 rounded-sm transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
          >
            <ArrowLeft size={20} />
            Volver a la tienda
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}