import { Sun } from "lucide-react";

import { cn } from "@/lib/utils";

type PromoLabelVariant = "hero" | "card" | "summary" | "hotSale";

interface PromoLabelProps {
  label: string;
  variant?: PromoLabelVariant;
  kicker?: string;
}

function buildDiscountHighlight(label: string, kicker?: string): string {
  if (kicker?.trim()) return kicker.trim();

  const percentageMatch = label.match(/(\d+(?:[.,]\d+)?)\s*%/);
  if (percentageMatch) {
    return `Hasta ${percentageMatch[1]}% OFF`;
  }

  return "Oferta limitada";
}

const variantClasses: Record<
  PromoLabelVariant,
  {
    badge: string;
    icon: string;
    label: string;
  }
> = {
  hero: {
    badge: "gap-1.5 px-3 py-1.5",
    icon: "h-4 w-4",
    label: "text-[13px] tracking-[0.18em]",
  },
  card: {
    badge: "gap-1 px-2.5 py-1",
    icon: "h-3.5 w-3.5",
    label: "text-[10px] tracking-[0.14em]",
  },
  summary: {
    badge: "gap-1.5 px-3 py-1.5",
    icon: "h-4 w-4",
    label: "text-[12px] tracking-[0.16em]",
  },
  hotSale: {
    badge: "gap-1.5 px-3 py-1.5",
    icon: "h-4 w-4",
    label: "text-[13px] tracking-[0.18em]",
  },
};

export default function PromoLabel({ label, variant = "hotSale", kicker }: PromoLabelProps) {
  const styles = variantClasses[variant];
  const displayLabel = label.trim() || "HOT SALE";

  if (variant === "summary") {
    const discountHighlight = buildDiscountHighlight(displayLabel, kicker);

    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-[#ff6e01] shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-7 text-center">
          {/* <span className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
            <Flame aria-hidden className="h-5 w- text-white" fill="currentColor" strokeWidth={1.8} />
          </span> */}

          <h2 className="m-0 font-serif text-[2.6rem] font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-[3rem]">
            {`¡${displayLabel}!`}
          </h2>

          <div className="mt-4 inline-block rounded-full bg-white px-4 py-2 shadow-sm">
            <span className="text-lg font-black uppercase tracking-[0.08em] text-[#ff6e01] sm:text-xl">
              {discountHighlight}
            </span>
          </div>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.34em] text-white/90">
            Limited Time Offer
          </p>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent_60%)]"
        />
      </div>
    );
  }

  // Promo del Mundial: franjas celestes arriba y abajo (guiño a la bandera
  // argentina), fondo blanco y sol de Mayo dorado. Usa la paleta de marca.
  const argentinaFlagBackground =
    "bg-[linear-gradient(to_bottom,var(--tender-cyan)_0%,var(--tender-cyan)_20%,#ffffff_20%,#ffffff_80%,var(--tender-cyan)_80%,var(--tender-cyan)_100%)]";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full text-[var(--tender-navy)] shadow-md ring-1 ring-[var(--tender-navy)]/10",
        argentinaFlagBackground,
        styles.badge
      )}
    >
      <Sun
        aria-hidden
        className={cn("shrink-0 text-[var(--tender-gold)]", styles.icon)}
        fill="currentColor"
        strokeWidth={1.8}
      />
      <span className={cn("whitespace-nowrap font-bold uppercase leading-none", styles.label)}>
        {displayLabel}
      </span>
    </div>
  );
}
