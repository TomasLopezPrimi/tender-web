import Link from "next/link";

type CategoryType = "colgante" | "rebatible";

interface CategoryTabsProps {
  active: CategoryType;
}

const tabs: { type: CategoryType; label: string }[] = [
  { type: "colgante", label: "Colgante" },
  { type: "rebatible", label: "Rebatible" },
];

export default function CategoryTabs({ active }: CategoryTabsProps) {
  return (
    <>
      <style>{`
        @keyframes tender-line-grow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        .tender-tab-line {
          animation: tender-line-grow 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }
      `}</style>

      <nav
        aria-label="Tipo de Tender"
        className="sticky top-0 z-30 w-full bg-background/85 backdrop-blur-xl border-b border-border/40"
      >
        <div className="container mx-auto flex justify-center px-4">
          <div role="tablist" className="flex items-stretch">
            {tabs.map((tab, i) => {
              const isActive = tab.type === active;
              return (
                <Link
                  key={tab.type}
                  href={`/productos?tipo=${tab.type}`}
                  scroll={false}
                  role="tab"
                  aria-selected={isActive}
                  className={`group relative flex items-center justify-center px-12 py-5 transition-colors duration-300 ${
                    isActive ? "cursor-default" : "hover:bg-[var(--tender-navy)]/[0.03]"
                  }`}
                >
                  {/* Vertical divider between tabs */}
                  {i > 0 && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-px bg-border/60"
                    />
                  )}

                  <span
                    className={`text-m font-bold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--tender-navy)]"
                        : "text-muted-foreground/55 group-hover:text-[var(--tender-navy)]/70"
                    }`}
                  >
                    {tab.label}
                  </span>

                  {/* Sliding underline — animates in on mount/navigation */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="tender-tab-line absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--tender-cyan)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
