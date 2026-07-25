import Link from "next/link";
import { ArrowRight, BadgeCheck, HardHat, PackageCheck, ShieldCheck } from "lucide-react";

import { config } from "@/config";
import { cn } from "@/lib/utils";

export const authInputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] transition-colors placeholder:text-slate-400 focus:border-[var(--tender-cyan)] focus:outline-none focus:ring-2 focus:ring-[color:color-mix(in_oklab,var(--tender-cyan)_24%,white)]";

const highlightIcons = {
  pedidos: PackageCheck,
  beneficios: BadgeCheck,
  profesional: HardHat,
  seguridad: ShieldCheck,
} as const;

type HighlightIcon = keyof typeof highlightIcons;

interface AuthSplitShellProps {
  eyebrow: string;
  title: string;
  description: string;
  panelTitle: string;
  panelCopy: string;
  highlights: Array<{ label: string; icon: HighlightIcon }>;
  children: React.ReactNode;
}

export function AuthSplitShell({
  eyebrow,
  title,
  description,
  panelTitle,
  panelCopy,
  highlights,
  children,
}: AuthSplitShellProps) {
  const whatsappHref = `https://wa.me/${config.whatsappNumber}`;

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] bg-[linear-gradient(180deg,#f7fafc_0%,#eef4f7_100%)]">
      <aside
        className="relative hidden w-[46%] overflow-hidden lg:block"
        style={{
          background:
            "radial-gradient(circle at top, color-mix(in oklab, var(--tender-cyan) 14%, transparent) 0%, transparent 32%), linear-gradient(160deg, var(--tender-navy) 0%, oklch(0.18 0.08 240) 100%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Link href="/" aria-label="Tender inicio" className="inline-flex w-fit">
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="h-6 w-auto brightness-0 invert"
              draggable={false}
            />
          </Link>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--tender-gold)]">
                {eyebrow}
              </p>
              <h2 className="max-w-md text-4xl font-black leading-[1.05] text-white xl:text-5xl">
                {panelTitle}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                {panelCopy}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map(({ label, icon }) => {
                const Icon = highlightIcons[icon];

                return (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-medium text-white/88 backdrop-blur-sm"
                  >
                    <Icon className="mb-3 h-4 w-4 text-[var(--tender-cyan)]" />
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-white/45">
            ¿Necesitás ayuda?{" "}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--tender-gold)] hover:underline"
            >
              Escribinos por WhatsApp
            </a>
          </p>
        </div>
      </aside>

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="w-full max-w-xl">
          <div className="mb-5 rounded-[28px] border border-[color:color-mix(in_oklab,var(--tender-cyan)_18%,white)] bg-white/80 p-5 shadow-[0_18px_50px_-32px_rgba(8,30,66,0.45)] backdrop-blur lg:hidden">
            <Link href="/" aria-label="Tender inicio" className="mb-5 inline-flex w-fit">
              <img
                src="/images/logo-tender.svg"
                alt="Tender®"
                className="h-5 w-auto"
                draggable={false}
              />
            </Link>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--tender-cyan)]">
              {eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight text-[var(--tender-navy-mid)]">
              {panelTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--tender-text-muted)]">
              {panelCopy}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {highlights.map(({ label, icon }) => {
                const Icon = highlightIcons[icon];

                return (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--tender-cyan)]" />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          <section className="rounded-[32px] border border-white/80 bg-white/92 p-6 shadow-[0_28px_80px_-40px_rgba(8,30,66,0.45)] backdrop-blur sm:p-8 lg:p-9">
            <div className="mb-8 max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--tender-cyan)]">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-[-0.02em] text-[var(--tender-navy-mid)] sm:text-[2rem]">
                {title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--tender-text-muted)]">
                {description}
              </p>
            </div>

            {children}
          </section>
        </div>
      </main>
    </div>
  );
}

export function AuthMessage({
  children,
  tone = "error",
}: {
  children: React.ReactNode;
  tone?: "error" | "success";
}) {
  return (
    <p
      className={cn(
        "rounded-2xl border px-4 py-3 text-sm",
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-emerald-200 bg-emerald-50 text-emerald-700",
      )}
    >
      {children}
    </p>
  );
}

export function GoogleAuthButton({ next, label }: { next: string; label: string }) {
  return (
    <a
      href={`/api/auth/google?next=${encodeURIComponent(next || "/cuenta")}`}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--tender-navy)] transition-all hover:border-[var(--tender-cyan)] hover:shadow-[0_16px_28px_-20px_rgba(13,200,213,0.7)]"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      {label}
    </a>
  );
}

export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

export function AuthFooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 font-semibold text-[var(--tender-navy)] transition-colors hover:text-[var(--tender-cyan)]"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
