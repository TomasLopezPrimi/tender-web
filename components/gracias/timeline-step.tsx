"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepConfig } from "@/types/gracias";

interface TimelineStepProps {
  step: StepConfig;
  index: number;
}

export function TimelineStep({ step, index }: TimelineStepProps) {
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
          isActive &&
            "border-[var(--tender-cyan)]/40 bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)]",
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
