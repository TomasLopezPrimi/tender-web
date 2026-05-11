"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CreditCard, MessageCircle, Package, Receipt } from "lucide-react";

function GraciasContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");

  const isTransferencia = paymentMethod === "transferencia" || paymentMethod === null;
  const isGetnetLink = paymentMethod === "getnet-link";
  const isGetnetWeb = paymentMethod === "getnet-web";

  const title = isTransferencia
    ? "¡Tu pedido está en marcha!"
    : isGetnetLink
      ? "¡Gracias por tu compra!"
      : isGetnetWeb
        ? "¡Tu pago está siendo procesado!"
        : "¡Gracias por tu compra!";

  const description = isTransferencia
    ? "Hemos recibido tu solicitud. Para confirmar tu compra y coordinar la entrega, es necesario que nos envíes el comprobante de transferencia."
    : isGetnetLink
      ? "Completá el pago en cada pestaña y, una vez acreditado, te vamos a contactar para coordinar la entrega."
      : isGetnetWeb
        ? "Si la plataforma confirmó el pago, vamos a verificar la acreditación y luego te vamos a contactar para coordinar la entrega."
        : "Recibimos tu compra y pronto nos vamos a contactar para coordinar la entrega.";

  const ctaTitle = isTransferencia
    ? "¿No se abrió WhatsApp automáticamente?"
    : "¿Necesitás ayuda con la entrega o la colocación?";

  const ctaText = isTransferencia
    ? "Hacé clic en el botón de abajo para abrir el chat directamente y adjuntar la captura de tu pago."
    : "Escribinos por WhatsApp si querés sumar colocación incluida o si tenés dudas sobre la entrega de tu compra.";

  const ctaLabel = isTransferencia
    ? "Enviar comprobante por WhatsApp"
    : "Contactar por WhatsApp";

  const CtaIcon = isTransferencia ? Receipt : MessageCircle;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--tender-gray-bg)]">

      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-2xl w-full text-center relative overflow-hidden">
          
          {/* Acento superior sutil con los colores de la marca */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--tender-cyan)] to-[var(--tender-navy)]"></div>
          
          {/* Ícono animado adaptado a la marca */}
          <div className="flex justify-center mb-6">
            <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[var(--tender-cyan)]/10 p-5 border-2 border-dashed border-[var(--tender-cyan)]/20">
              {isTransferencia ? (
                <Package size={56} className="text-[var(--tender-cyan)]" />
              ) : (
                <CreditCard size={56} className="text-[var(--tender-cyan)]" />
              )}
            </div>
</div>
          </div>

          {/* Título usando la fuente Serif (Playfair/Georgia) para más elegancia */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tender-navy)] mb-4">
            {title}
          </h1>
          
          {/* Detalle decorativo en dorado basado en tu CSS */}
          <div className="gold-line my-6"></div>
          
          <p className="text-[var(--tender-text-muted)] text-lg mb-8 leading-relaxed px-2 md:px-8">
            {isTransferencia ? (
              <>
                Hemos recibido tu solicitud. Para confirmar tu compra y coordinar la entrega, es necesario que nos envíes el <strong className="text-[var(--tender-text-dark)] font-semibold">comprobante de transferencia</strong>.
              </>
            ) : (
              description
            )}
          </p>

          {/* Tarjeta de Call to Action (CTA) para WhatsApp */}
          <div className="bg-[var(--tender-gray-bg)] border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
            <div className="flex justify-center mb-3">
              <CtaIcon size={28} className="text-[var(--tender-navy-mid)]" />
            </div>
            <h3 className="font-semibold text-[var(--tender-navy)] text-lg mb-2">
              {ctaTitle}
            </h3>
            <p className="text-sm text-[var(--tender-text-muted)] mb-6 max-w-md mx-auto">
              {ctaText}
            </p>
            
            {/* Botón primario: WhatsApp (Color verde característico pero integrado al diseño) */}
            <a 
              href="https://wa.me/5491131876811" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-4 px-8 rounded-md transition-all shadow-md hover:shadow-lg w-full sm:w-auto text-base"
            >
              <MessageCircle size={20} />
              {ctaLabel}
            </a>
          </div>

          {/* Botón secundario: Volver a la tienda */}
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 text-[var(--tender-text-muted)] hover:text-[var(--tender-cyan)] font-medium py-2 px-4 transition-colors group"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Volver a la tienda
          </Link>
        </div>
      </main>

    </div>
  );
}

export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Cargando...</p></div>}>
      <GraciasContent />
    </Suspense>
  );
}