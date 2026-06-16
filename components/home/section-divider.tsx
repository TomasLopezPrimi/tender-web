/**
 * SectionDivider
 *
 * A slim navy band used to visually break two adjacent light-background sections.
 * Uses the same brand motif found in BrandOriginSection: white logo + centered
 * gold gradient rule. Purely decorative — no semantic content.
 *
 * Tokens: --tender-navy, --tender-gold
 */
export default function SectionDivider() {
  return (
    <div
      className="py-8 flex flex-col items-center gap-3"
      style={{ background: "var(--tender-navy)" }}
      aria-hidden="true"
    >
      <img
        src="/images/logo-tender.svg"
        alt=""
        className="h-7 w-auto select-none opacity-90"
        style={{ filter: "brightness(0) invert(1)" }}
        draggable={false}
      />
      <div
        className="h-px w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--tender-gold), transparent)",
        }}
      />
    </div>
  )
}
