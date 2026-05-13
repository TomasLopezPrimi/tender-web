"use client";

import Link from "next/link";
import {
  AlertCircle,
  Check,
  Lock,
  CreditCard,
  Landmark,
  MessageCircle,
  RotateCcw,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { config } from "@/config";
import { cn } from "@/lib/utils";

function HeroIconWithRings({
  icon: Icon,
  tone,
  loop,
}: {
  icon: LucideIcon;
  tone: "cyan" | "amber";
  loop: boolean;
}) {
  const ringClass = tone === "amber" ? "border-amber-300/50" : "border-white/30";
  const glowClass = tone === "amber"
    ? "bg-amber-400/25"
    : "bg-[radial-gradient(circle,_rgba(125,221,255,0.42)_0%,_rgba(125,221,255,0)_72%)]";

  return (
    <div className="relative mx-auto flex h-28 w-28 items-center justify-center animate-hero-float md:h-32 md:w-32">
      <div aria-hidden className={cn("absolute inset-0 rounded-full blur-2xl", glowClass)} />
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "absolute rounded-full border",
            ringClass,
            loop ? "animate-ring-pulse" : "animate-ring-once",
          )}
          style={{
            inset: `${index * -12}px`,
            animationDelay: `${index * 180}ms`,
          }}
        />
      ))}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm md:h-28 md:w-28">
        <Icon size={42} className="text-white md:size-12" strokeWidth={2.2} />
      </div>
    </div>
  );
}

function TicketPerforation() {
  return (
    <div className="relative h-8 bg-white">
      <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-[var(--tender-gold)]/45" />
      <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--tender-gray-bg)]" />
      <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--tender-gray-bg)]" />
    </div>
  );
}

export default function PagoRechazadoPage() {
  const whatsappHref = `https://wa.me/${config.whatsappNumber}`;
  const reasons = [
    {
      icon: CreditCard,
      title: "Datos mal ingresados",
      description: "Verificá número, vencimiento y CVV.",
    },
    {
      icon: Wallet,
      title: "Fondos insuficientes",
      description: "Tu límite o saldo no alcanzaron.",
    },
    {
      icon: Landmark,
      title: "Tu banco rechazó la operación",
      description: "Llamalos o probá con otra tarjeta.",
    },
    {
      icon: Lock,
      title: "Compras online no habilitadas",
      description: "Habilitalas desde la app del banco.",
    },
  ];

  return (
    <div className="min-h-[80vh] bg-[var(--tender-gray-bg)] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <article className="animate-fade-in-up relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-white shadow-xl shadow-[var(--tender-navy)]/5">
          <header className="relative isolate overflow-hidden bg-gradient-to-br from-[var(--tender-navy)] via-[var(--tender-navy-mid)] to-amber-700 px-8 pt-12 pb-14 text-center text-white md:px-12 md:pt-16 md:pb-20">
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.22),_transparent_54%)]" />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,_rgba(255,255,255,0.06),_transparent)]" />
            <HeroIconWithRings icon={AlertCircle} tone="amber" loop={false} />
            <h1 className="mt-8 font-serif text-3xl font-bold leading-tight md:text-5xl">
              Tu pago no se completó
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-amber-100/90 md:text-lg">
              Tranquilo, lo solucionamos juntos.
            </p>
          </header>

          <TicketPerforation />

          <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
            <div className="flex justify-center">
              <Badge className="gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-medium text-green-700">
                <Check size={14} strokeWidth={3} />
                No se realizó ningún cargo a tu tarjeta
              </Badge>
            </div>

            <section className="space-y-3 text-center">
              <p className="text-lg font-semibold text-[var(--tender-navy)]">
                Esto suele pasar y casi siempre se resuelve en segundos.
              </p>
              <p className="text-sm leading-relaxed text-[var(--tender-text-muted)] md:text-base">
                Tus productos siguen en el carrito esperándote.
              </p>
            </section>

            <section className="space-y-4">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tender-text-muted)]">
                  Razones más comunes
                </p>
              </div>
              <ul className="space-y-3">
                {reasons.map(({ icon: Icon, title, description }, index) => (
                  <li
                    key={title}
                    className="animate-slide-in-right flex items-start gap-4 rounded-2xl border border-gray-200 p-4"
                    style={{ animationDelay: `${index * 110}ms` }}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)]">
                      <Icon size={19} />
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-semibold text-[var(--tender-navy)] md:text-base">{title}</p>
                      <p className="text-xs leading-relaxed text-[var(--tender-text-muted)] md:text-sm">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <div className="space-y-3">
              <Link
                href="/carrito"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--tender-navy)] text-base font-semibold text-white shadow-md transition-colors hover:bg-[var(--tender-navy-mid)]"
              >
                <RotateCcw size={18} />
                Volver al carrito
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] text-base font-semibold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white"
              >
                <MessageCircle size={18} />
                Contactar por WhatsApp
              </a>
            </div>

            <div className="gold-line" />

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[var(--tender-text-muted)]">
              <Lock size={12} /> Tu información está segura
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
