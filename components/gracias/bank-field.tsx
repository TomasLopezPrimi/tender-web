"use client";

import { Check, Copy } from "lucide-react";

interface BankFieldProps {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}

export function BankField({ label, value, copied, onCopy }: BankFieldProps) {
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
        {copied ? (
          <Check size={16} className="shrink-0 text-green-600" strokeWidth={3} />
        ) : (
          <Copy
            size={16}
            className="shrink-0 text-[var(--tender-text-muted)] transition-colors group-hover:text-[var(--tender-cyan)]"
          />
        )}
      </button>
    </div>
  );
}
