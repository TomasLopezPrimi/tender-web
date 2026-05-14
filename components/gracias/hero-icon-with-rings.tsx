"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { RingTone } from "@/types/gracias";

interface HeroIconWithRingsProps {
  icon: LucideIcon;
  tone: RingTone;
  loop: boolean;
}

export function HeroIconWithRings({ icon: Icon, tone, loop }: HeroIconWithRingsProps) {
  const ringClass = tone === "amber" ? "border-amber-300/50" : "border-white/30";
  const glowClass =
    tone === "amber"
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
