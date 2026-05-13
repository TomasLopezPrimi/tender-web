"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/hooks/use-cart-store";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  CreditCard,
  ExternalLink,
  Landmark,
  MessageCircle,
  Package,
  Receipt,
  ShieldCheck,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { config } from "@/config";
import { cn } from "@/lib/utils";
import {
  readThankYouContext,
  saveThankYouContext,
  ThankYouPaymentMethod,
} from "@/lib/thank-you-context";

type VariantKind = "transferencia" | "getnet-link" | "getnet-web";
type RingTone = "cyan" | "amber";
type StepStatus = "done" | "active" | "pending";

interface StepConfig {
  id: number;
  label: string;
  desc: string;
  icon: LucideIcon;
  status: StepStatus;
}

interface VariantConfig {
  title: string;
  subtitle: string;
  heroGradient: string;
  heroIcon: LucideIcon;
  ringTone: RingTone;
  ringLoop: boolean;
  stepsHeading: string;
  steps: StepConfig[];
  showBankPanel: boolean;
  showOrderId: boolean;
  helperNote: string | null;
  ctaLabel: string;
  ctaIcon: LucideIcon;
}

const variantConfig: Record<VariantKind, VariantConfig> = {
  transferencia: {
    title: "¡Pedido recibido!",
    subtitle: "Mandanos el comprobante por WhatsApp y confirmamos tu pedido.",
    heroGradient: "from-[var(--tender-navy)] via-[var(--tender-navy-mid)] to-[var(--tender-cyan)]",
    heroIcon: Wallet,
    ringTone: "cyan",
    ringLoop: true,
    stepsHeading: "¿Cómo confirmar tu pedido?",
    steps: [
      {
        id: 1,
        label: "Hacé la transferencia",
        desc: "Usá el alias o CBU de Tender.",
        icon: Landmark,
        status: "active",
      },
      {
        id: 2,
        label: "Mandanos el comprobante",
        desc: "Por WhatsApp, captura o PDF.",
        icon: Receipt,
        status: "pending",
      },
      {
        id: 3,
        label: "Coordinamos la entrega",
        desc: "Te contactamos en horas hábiles.",
        icon: Truck,
        status: "pending",
      },
    ],
    showBankPanel: true,
    showOrderId: false,
    helperNote: null,
    ctaLabel: "Enviar comprobante por WhatsApp",
    ctaIcon: Receipt,
  },
  "getnet-link": {
    title: "¡Gracias por tu compra!",
    subtitle: "Completá el pago en cada pestaña abierta. Te avisamos cuando se acredite.",
    heroGradient: "from-[var(--tender-navy)] to-[var(--tender-navy-mid)]",
    heroIcon: CheckCircle2,
    ringTone: "cyan",
    ringLoop: true,
    stepsHeading: "¿Qué sigue?",
    steps: [
      {
        id: 1,
        label: "Links abiertos",
        desc: "Ya abriste las pestañas de pago.",
        icon: ExternalLink,
        status: "done",
      },
      {
        id: 2,
        label: "Pagá en cada link",
        desc: "Completá el flujo en cada uno.",
        icon: CreditCard,
        status: "active",
      },
      {
        id: 3,
        label: "Coordinamos entrega",
        desc: "Cuando todo se acredite.",
        icon: Truck,
        status: "pending",
      },
    ],
    showBankPanel: false,
    showOrderId: false,
    helperNote: "¿Cerraste sin querer? Escribinos y te reenviamos los links.",
    ctaLabel: "Contactar por WhatsApp",
    ctaIcon: MessageCircle,
  },
  "getnet-web": {
    title: "¡Pago aprobado!",
    subtitle: "Tu pedido está confirmado. Coordinamos la entrega en las próximas horas.",
    heroGradient: "from-[var(--tender-navy)] via-[var(--tender-navy-mid)] to-[var(--tender-cyan)]",
    heroIcon: CheckCircle2,
    ringTone: "cyan",
    ringLoop: true,
    stepsHeading: "Tu pedido en curso",
    steps: [
      {
        id: 1,
        label: "Pago acreditado",
        desc: "Recibimos tu pago correctamente.",
        icon: CheckCircle2,
        status: "done",
      },
      {
        id: 2,
        label: "Preparamos tu pedido",
        desc: "Lo coordinamos por WhatsApp.",
        icon: Receipt,
        status: "active",
      },
      {
        id: 3,
        label: "Entrega",
        desc: "Llega en 3-7 días hábiles.",
        icon: Truck,
        status: "pending",
      },
    ],
    showBankPanel: false,
    showOrderId: true,
    helperNote: "Te enviamos un mail con el detalle de la compra.",
    ctaLabel: "Contactar por WhatsApp",
    ctaIcon: MessageCircle,
  },
};

function HeroIconWithRings({
  icon: Icon,
  tone,
  loop,
}: {
  icon: LucideIcon;
  tone: RingTone;
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
            animationDelay: `${index * 220}ms`,
          }}
        />
      ))}
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/12 backdrop-blur-sm md:h-28 md:w-28">
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

function TimelineStep({ step, index }: { step: StepConfig; index: number }) {
  const Icon = step.icon;
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  return (
    <div
      className="relative animate-slide-in-right rounded-2xl border p-4 pl-16 md:pl-4 md:pt-6"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div
        className={cn(
          "absolute left-0 top-12 bottom-[-1rem] w-px md:hidden",
          index === 2 && "hidden",
          "bg-gradient-to-b from-[var(--tender-cyan)]/30 to-gray-200",
        )}
      />
      <div
        className={cn(
          "absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border md:static md:mx-auto",
          isDone && "border-green-200 bg-green-50 text-green-600",
          isActive && "border-[var(--tender-cyan)]/40 bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)]",
          !isDone && !isActive && "border-gray-200 bg-gray-50 text-[var(--tender-text-muted)]",
        )}
      >
        {isDone ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
      </div>
      <div className="space-y-2 md:mt-4 md:text-center">
        <div className="flex flex-wrap items-center gap-2 md:justify-center">
          <p
            className={cn(
              "text-sm font-semibold text-[var(--tender-navy)]",
              isDone && "text-green-700 line-through decoration-green-300/80",
              !isDone && !isActive && "text-[var(--tender-text-muted)]",
            )}
          >
            {step.label}
          </p>
          {isActive && (
            <span className="rounded-full bg-[var(--tender-cyan)]/10 px-2 py-0.5 text-[11px] font-medium text-[var(--tender-cyan)]">
              · Ahora
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-[var(--tender-text-muted)]">{step.desc}</p>
      </div>
    </div>
  );
}

function TrustRow() {
  const items = [
    { icon: Truck, title: "Envío", text: "3 a 7 días hábiles" },
    { icon: MessageCircle, title: "Atención personal", text: "Lun-Vie 9-18hs" },
    { icon: ShieldCheck, title: "Pago seguro", text: "Datos protegidos" },
  ];

  return (
    <div className="grid gap-3 rounded-2xl bg-[var(--tender-gray-bg)] p-4 md:grid-cols-3 md:gap-4 md:p-5">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)]">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--tender-navy)]">{title}</p>
            <p className="text-xs text-[var(--tender-text-muted)]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BankField({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="pl-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--tender-text-muted)]">
        {label}
      </span>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copiar ${label} ${value}`}
        className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-3 text-left transition-colors hover:border-[var(--tender-cyan)]/30 focus-visible:ring-2 focus-visible:ring-[var(--tender-cyan)]/35 focus-visible:ring-offset-2"
      >
        <code className="pr-3 text-xs font-bold text-[var(--tender-navy)] md:text-sm">{value}</code>
        {copied
          ? <Check size={16} className="shrink-0 text-green-600" strokeWidth={3} />
          : <Copy size={16} className="shrink-0 text-[var(--tender-text-muted)] transition-colors group-hover:text-[var(--tender-cyan)]" />}
      </button>
    </div>
  );
}

interface ResolvedThankYouState {
  paymentMethod: ThankYouPaymentMethod | null;
  orderId: string | null;
}

function isThankYouPaymentMethod(value: string | null): value is ThankYouPaymentMethod {
  return value === "transferencia" || value === "getnet-link" || value === "getnet-web";
}

function GraciasContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const [resolvedState, setResolvedState] = useState<ResolvedThankYouState>({
    paymentMethod: null,
    orderId: null,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const rawPaymentMethodFromQuery = searchParams.get("paymentMethod");
    const paymentMethodFromQuery = isThankYouPaymentMethod(rawPaymentMethodFromQuery)
      ? rawPaymentMethodFromQuery
      : null;
    const orderIdFromQuery = searchParams.get("orderId");
    const storedContext = readThankYouContext();

    if (paymentMethodFromQuery || orderIdFromQuery) {
      const resolvedOrderId = orderIdFromQuery
        ?? (storedContext?.paymentMethod === paymentMethodFromQuery && storedContext.orderId != null
          ? String(storedContext.orderId)
          : null);

      setResolvedState({
        paymentMethod: paymentMethodFromQuery,
        orderId: resolvedOrderId,
      });

      if (paymentMethodFromQuery) {
        saveThankYouContext({
          paymentMethod: paymentMethodFromQuery,
          orderId: resolvedOrderId ? Number(resolvedOrderId) : null,
        });
        if (paymentMethodFromQuery === "getnet-web") clearCart();
      }
      return;
    }

    setResolvedState({
      paymentMethod: storedContext?.paymentMethod ?? null,
      orderId: storedContext?.orderId != null ? String(storedContext.orderId) : null,
    });
  }, [searchParams]);

  const paymentMethod = resolvedState.paymentMethod;
  const orderId = resolvedState.orderId;
  const variantKey: VariantKind = paymentMethod && isThankYouPaymentMethod(paymentMethod)
    ? paymentMethod
    : "transferencia";
  const variant = variantConfig[variantKey];
  const whatsappHref = `https://wa.me/${config.whatsappNumber}`;

  const copyToClipboard = async (text: string, field: string) => {
    if (!navigator.clipboard) return;
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-[80vh] bg-[var(--tender-gray-bg)] px-4 py-10 md:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <article className="animate-fade-in-up relative w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-white shadow-xl shadow-[var(--tender-navy)]/5">
          <header
            className={cn(
              "relative isolate overflow-hidden px-8 pt-12 pb-14 text-center text-white md:px-12 md:pt-16 md:pb-20",
              "bg-gradient-to-br",
              variant.heroGradient,
            )}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_52%)]"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,_rgba(255,255,255,0.08),_transparent)]"
            />
            <HeroIconWithRings
              icon={variant.heroIcon}
              tone={variant.ringTone}
              loop={variant.ringLoop}
            />
            <h1 className="mt-8 font-serif text-3xl font-bold leading-tight md:text-5xl">
              {variant.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-white/85 md:text-lg">
              {variant.subtitle}
            </p>
          </header>

          <TicketPerforation />

          <div className="space-y-8 px-6 py-8 md:px-10 md:py-10">
            {variant.showOrderId && orderId && (
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--tender-gold)]/40 bg-[var(--tender-gold-light)]/20 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-widest text-[var(--tender-navy)]">
                  <span className="opacity-60">Pedido</span>
                  <span className="font-bold">#{orderId}</span>
                </span>
              </div>
            )}

            {!variant.showOrderId && (
              <div className="flex justify-center">
                <Badge className="rounded-full border-[var(--tender-cyan)]/20 bg-[var(--tender-cyan)]/10 px-4 py-1.5 text-[11px] font-medium text-[var(--tender-navy)]">
                  <Check size={14} className="text-[var(--tender-cyan)]" strokeWidth={3} />
                  Seguimiento claro, sin pasos de más
                </Badge>
              </div>
            )}

            <section className="space-y-4">
              <div className="text-center md:text-left">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--tender-text-muted)]">
                  {variant.stepsHeading}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {variant.steps.map((step, index) => (
                  <TimelineStep key={step.id} step={step} index={index} />
                ))}
              </div>
            </section>

            {variant.showBankPanel && (
              <section className="space-y-3 rounded-2xl border border-gray-200 bg-[var(--tender-gray-bg)]/70 p-4">
                <Collapsible defaultOpen={false}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 transition-colors hover:border-[var(--tender-cyan)]/30">
                    <span className="flex items-center gap-2 text-sm font-semibold text-[var(--tender-navy)]">
                      <Landmark size={18} className="text-[var(--tender-cyan)]" />
                      Ver datos bancarios
                    </span>
                    <ChevronDown size={18} className="text-[var(--tender-text-muted)] transition-transform data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-2 animate-fade-in">
                    <BankField
                      label="Alias"
                      value={config.bankDetails.alias}
                      copied={copiedField === "alias"}
                      onCopy={() => copyToClipboard(config.bankDetails.alias, "alias")}
                    />
                    <BankField
                      label="CBU"
                      value={config.bankDetails.cbu}
                      copied={copiedField === "cbu"}
                      onCopy={() => copyToClipboard(config.bankDetails.cbu, "cbu")}
                    />
                    <p className="pl-1 text-[11px] text-[var(--tender-text-muted)]">
                      <span className="font-semibold">Titular:</span> {config.bankDetails.titular}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </section>
            )}

            <section className="-mx-6 border-t border-gray-100 bg-[var(--tender-gray-bg)] px-6 py-6 md:-mx-10 md:px-10">
              {variant.helperNote && (
                <p className="mb-4 text-center text-sm text-[var(--tender-text-muted)]">
                  {variant.helperNote}
                </p>
              )}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] text-base font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/30 focus-visible:ring-2 focus-visible:ring-[#25D366]/40 focus-visible:ring-offset-2"
              >
                <variant.ctaIcon size={22} />
                <span>{variant.ctaLabel}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </section>

            <div className="gold-line" />

            <TrustRow />

            <div className="flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--tender-text-muted)] transition-colors hover:text-[var(--tender-cyan)]"
              >
                <ArrowRight size={16} className="rotate-180" />
                Volver a la tienda
              </Link>
            </div>
          </div>
        </article>
      </div>
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
