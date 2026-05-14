import {
  CheckCircle2,
  CreditCard,
  ExternalLink,
  Landmark,
  MessageCircle,
  Receipt,
  Truck,
  Wallet,
} from "lucide-react";
import type { ThankYouPaymentMethod } from "@/lib/thank-you-context";
import type { VariantConfig, VariantKind } from "@/types/gracias";

export const variantConfig: Record<VariantKind, VariantConfig> = {
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

export function isThankYouPaymentMethod(
  value: string | null,
): value is ThankYouPaymentMethod {
  return value === "transferencia" || value === "getnet-link" || value === "getnet-web";
}
