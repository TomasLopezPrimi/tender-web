"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, XCircle } from "lucide-react";

export default function PagoRechazadoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--tender-gray-bg)]">
      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-2xl w-full text-center relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-[var(--tender-navy)]"></div>

          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-red-50 p-5 border-2 border-dashed border-red-200">
              <XCircle size={56} className="text-red-500" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tender-navy)] mb-4">
            No pudimos procesar tu pago
          </h1>

          <div className="gold-line my-6"></div>

          <p className="text-[var(--tender-text-muted)] text-lg mb-8 leading-relaxed px-2 md:px-8">
            El pago fue rechazado. Tus productos siguen en el carrito: podés intentar de nuevo o probar con otro método.
          </p>

          <div className="bg-[var(--tender-gray-bg)] border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
            <div className="flex justify-center mb-3">
              <MessageCircle size={28} className="text-[var(--tender-navy-mid)]" />
            </div>
            <h3 className="font-semibold text-[var(--tender-navy)] text-lg mb-2">
              ¿Necesitás ayuda?
            </h3>
            <p className="text-sm text-[var(--tender-text-muted)] mb-6 max-w-md mx-auto">
              Si tenés dudas con el pago o querés que te ayudemos a completar la compra, escribinos por WhatsApp.
            </p>

            <a
              href="https://wa.me/5491131876811"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-4 px-8 rounded-md transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-base"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </a>
          </div>

          <Link
            href="/carrito"
            className="inline-flex items-center justify-center gap-2 bg-[var(--tender-navy)] hover:bg-[var(--tender-navy-mid)] text-white font-semibold py-3 px-8 rounded-md transition-all w-full sm:w-auto"
          >
            <ArrowLeft size={18} />
            Volver al carrito e intentar de nuevo
          </Link>
        </div>
      </main>
    </div>
  );
}
