import type { LucideIcon } from "lucide-react";

export type VariantKind = "transferencia" | "getnet-link" | "getnet-web";
export type RingTone = "cyan" | "amber";
export type StepStatus = "done" | "active" | "pending";

export interface StepConfig {
  id: number;
  label: string;
  desc: string;
  icon: LucideIcon;
  status: StepStatus;
}

export interface VariantConfig {
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

export interface ResolvedThankYouState {
  paymentMethod: import("@/lib/thank-you-context").ThankYouPaymentMethod | null;
  orderId: string | null;
}
