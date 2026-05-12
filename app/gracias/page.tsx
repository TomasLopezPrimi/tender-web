"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, CheckCircle2, MessageCircle, Package, Receipt } from "lucide-react";

function GraciasContent() {
  const searchParams = useSearchParams();
  const paymentMethod = searchParams.get("paymentMethod");
  const orderId = searchParams.get("orderId");

  const isTransferencia = paymentMethod === "transferencia" || paymentMethod === null;
  const isGetnetLink = paymentMethod === "getnet-link";
  const isGetnetWeb = paymentMethod === "getnet-web";

  const title = isTransferencia
    ? "¡Pedido recibido!"
    : isGetnetLink
      ? "¡Gracias por tu compra!"
      : isGetnetWeb
        ? "¡Pago aprobado!"
        : "¡Gracias por tu compra!";

  const description = isTransferencia
    ? "Recibimos tu pedido. Para confirmarlo, mandanos el comprobante de transferencia por WhatsApp."
    : isGetnetLink
      ? "Completá el pago en cada pestaña abierta. Cuando se acredite, te contactamos para coordinar la entrega."
      : isGetnetWeb
        ? (orderId
            ? `Tu pedido #${orderId} fue confirmado. Te enviamos un mail con el detalle y en las próximas horas te contactamos por WhatsApp para coordinar la entrega.`
            : "Tu pago fue confirmado. Te enviamos un mail con el detalle y en las próximas horas te contactamos por WhatsApp para coordinar la entrega.")
        : "Recibimos tu compra y pronto te contactamos para coordinar la entrega.";

  const ctaTitle = isTransferencia
    ? "¿No se abrió WhatsApp?"
    : "¿Necesitás ayuda?";

  const ctaText = isTransferencia
    ? "Tocá el botón para abrir el chat y mandar la captura del pago."
    : "Escribinos por WhatsApp si tenés dudas sobre la entrega o querés sumar colocación.";

  const ctaLabel = isTransferencia
    ? "Enviar comprobante por WhatsApp"
    : "Contactar por WhatsApp";

  const CtaIcon = isTransferencia ? Receipt : MessageCircle;
  const HeroIcon = isGetnetWeb
    ? CheckCircle2
    : isTransferencia
      ? Package
      : CheckCircle2;
  const heroAccent = isGetnetWeb ? "text-green-600" : "text-[var(--tender-cyan)]";
  const heroBg = isGetnetWeb
    ? "bg-green-50 border-green-200"
    : "bg-[var(--tender-cyan)]/10 border-[var(--tender-cyan)]/20";

  return (
    <div className="flex flex-col min-h-screen bg-[var(--tender-gray-bg)]">

      <main className="flex-grow flex items-center justify-center container mx-auto px-4 py-12 animate-fade-in-up">
        <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg border border-gray-100 max-w-2xl w-full text-center relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--tender-cyan)] to-[var(--tender-navy)]"></div>

          <div className="flex justify-center mb-6">
            <div className={`rounded-full p-5 border-2 border-dashed ${heroBg}`}>
              <HeroIcon size={56} className={heroAccent} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--tender-navy)] mb-4">
            {title}
          </h1>

          {isGetnetWeb && orderId && (
            <p className="text-sm uppercase tracking-wider text-[var(--tender-text-muted)] mb-2">
              Pedido <span className="font-semibold text-[var(--tender-navy)]">#{orderId}</span>
            </p>
          )}

          <div className="gold-line my-6"></div>

          <p className="text-[var(--tender-text-muted)] text-lg mb-8 leading-relaxed px-2 md:px-8">
            {description}
          </p>

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
