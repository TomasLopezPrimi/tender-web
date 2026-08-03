"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrderStatus } from "@/actions/cart";
import { useCartStore } from "@/hooks/use-cart-store";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CircleX,
  Clock3,
  Landmark,
  LoaderCircle,
  RefreshCw,
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
} from "@/lib/thank-you-context";
import { isThankYouPaymentMethod, variantConfig } from "@/lib/gracias-variants";
import type { ResolvedThankYouState, VariantConfig, VariantKind } from "@/types/gracias";
import { HeroIconWithRings } from "./hero-icon-with-rings";
import { TicketPerforation } from "./ticket-perforation";
import { TimelineStep } from "./timeline-step";
import { TrustRow } from "./trust-row";
import { BankField } from "./bank-field";

type PaymentVerification = "idle" | "checking" | "paid" | "cancelled" | "unconfirmed";

const validOrderId = (value: string | null) => {
  if (!value) return null;
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? String(id) : null;
};

export function GraciasContent() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const [resolvedState, setResolvedState] = useState<ResolvedThankYouState>({
    paymentMethod: null,
    orderId: null,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [verification, setVerification] = useState<PaymentVerification>("idle");
  const [verificationAttempt, setVerificationAttempt] = useState(0);

  useEffect(() => {
    const rawPaymentMethodFromQuery = searchParams.get("paymentMethod");
    const paymentMethodFromQuery = isThankYouPaymentMethod(rawPaymentMethodFromQuery)
      ? rawPaymentMethodFromQuery
      : null;
    const orderIdFromQuery = validOrderId(searchParams.get("orderId"));
    const storedContext = readThankYouContext();

    if (paymentMethodFromQuery || orderIdFromQuery) {
      const resolvedOrderId =
        orderIdFromQuery ??
        (storedContext?.paymentMethod === paymentMethodFromQuery &&
        storedContext.orderId != null
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
      }
      return;
    }

    // Fallback: read from sessionStorage (e.g. navigating back to /gracias)
    setResolvedState({
      paymentMethod: storedContext?.paymentMethod ?? null,
      orderId: storedContext?.orderId != null ? String(storedContext.orderId) : null,
    });
  }, [searchParams]);

  const paymentMethod = resolvedState.paymentMethod;
  const orderId = resolvedState.orderId;

  useEffect(() => {
    if (paymentMethod !== "getnet-web") {
      setVerification("idle");
      return;
    }

    const parsedOrderId = Number(orderId);
    if (!Number.isInteger(parsedOrderId) || parsedOrderId <= 0) {
      setVerification("unconfirmed");
      return;
    }

    let disposed = false;
    let requestInProgress = false;
    setVerification("checking");

    const poll = window.setInterval(checkStatus, 2000);
    const timeout = window.setTimeout(() => {
      window.clearInterval(poll);
      if (!disposed) setVerification("unconfirmed");
    }, 30000);

    async function checkStatus() {
      if (requestInProgress) return;
      requestInProgress = true;
      const result = await getOrderStatus(parsedOrderId);
      requestInProgress = false;
      if (disposed || "error" in result) return;

      if (result.status === "PAGADO") {
        window.clearInterval(poll);
        window.clearTimeout(timeout);
        setVerification("paid");
        clearCart();
      } else if (result.status === "CANCELADO") {
        window.clearInterval(poll);
        window.clearTimeout(timeout);
        setVerification("cancelled");
      }
    }

    void checkStatus();

    return () => {
      disposed = true;
      window.clearInterval(poll);
      window.clearTimeout(timeout);
    };
  }, [paymentMethod, orderId, verificationAttempt, clearCart]);

  const variantKey: VariantKind =
    paymentMethod && isThankYouPaymentMethod(paymentMethod) ? paymentMethod : "transferencia";
  const baseVariant = variantConfig[variantKey];
  let variant: VariantConfig = baseVariant;

  if (paymentMethod === "getnet-web" && verification !== "paid") {
    const cancelled = verification === "cancelled";
    const checking = verification === "checking";
    variant = {
      ...baseVariant,
      title: cancelled
        ? "El pago no se completó"
        : checking
          ? "Estamos verificando tu pago"
          : "Tu pago sigue en verificación",
      subtitle: cancelled
        ? "Tu pedido sigue registrado y el carrito se conservó para que puedas intentarlo nuevamente."
        : checking
          ? "La confirmación de Getnet puede demorar unos segundos. No cierres esta página."
          : "Todavía no recibimos la confirmación. No vuelvas a pagarlo hasta consultar el estado.",
      heroIcon: cancelled ? CircleX : Clock3,
      ringTone: "amber",
      ringLoop: checking,
      stepsHeading: cancelled ? "Estado del pedido" : "Confirmación en curso",
      steps: [
        {
          id: 1,
          label: "Pedido recibido",
          desc: "Guardamos los datos de tu compra.",
          icon: Check,
          status: "done",
        },
        {
          id: 2,
          label: cancelled ? "Pago no completado" : "Verificando pago",
          desc: cancelled ? "Getnet no confirmó la operación." : "Esperamos la confirmación de Getnet.",
          icon: cancelled ? CircleX : Clock3,
          status: "active",
        },
        {
          id: 3,
          label: cancelled ? "Podés volver a intentarlo" : "Preparación",
          desc: cancelled ? "Tu carrito continúa disponible." : "Comenzará cuando se acredite el pago.",
          icon: cancelled ? RefreshCw : baseVariant.steps[2].icon,
          status: "pending",
        },
      ],
      helperNote: cancelled
        ? "No se eliminó ningún producto de tu carrito."
        : "No hace falta iniciar otro pago mientras verificamos este pedido.",
    };
  }
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

            {paymentMethod === "getnet-web" && verification === "checking" && (
              <div
                aria-live="polite"
                className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--tender-navy)]"
              >
                <LoaderCircle size={18} className="animate-spin text-[var(--tender-cyan)]" />
                Consultando el estado del pedido
              </div>
            )}

            {paymentMethod === "getnet-web" && verification === "unconfirmed" && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
                <p className="text-sm text-amber-950">
                  Si acabás de pagar, la confirmación puede tardar unos segundos más.
                </p>
                <button
                  type="button"
                  onClick={() => setVerificationAttempt((attempt) => attempt + 1)}
                  className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--tender-navy)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--tender-navy-mid)] focus-visible:ring-2 focus-visible:ring-[var(--tender-cyan)] focus-visible:ring-offset-2"
                >
                  <RefreshCw size={17} />
                  Consultar nuevamente
                </button>
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
                    <ChevronDown
                      size={18}
                      className="text-[var(--tender-text-muted)] transition-transform data-[state=open]:rotate-180"
                    />
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
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5"
                />
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
