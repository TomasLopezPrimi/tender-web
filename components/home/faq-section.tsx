"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/faq-data"

/**
 * FAQ section for the home page.
 *
 * Renders the same FAQ_ITEMS array that drives the FAQPage JSON-LD in app/page.tsx,
 * guaranteeing 1:1 correspondence (Google requirement for FAQPage schema).
 *
 * Design: matches the existing home design system — navy background, gold accents,
 * Tailwind 4 utility classes, Shadcn UI Accordion. No layout redesign.
 */
export default function FaqSection() {
  return (
    <section
      className="py-16 lg:py-24 bg-[var(--tender-gray-bg)]"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[var(--tender-gold)]/40 text-[var(--tender-gold)] mb-6">
            Preguntas frecuentes
          </span>
          <h2
            id="faq-heading"
            className="text-3xl md:text-4xl font-serif text-[var(--tender-text-dark)] tracking-wide"
          >
            Todo sobre{" "}
            <span className="italic" style={{ color: "var(--tender-navy)" }}>
              Tender®
            </span>
          </h2>
          <div className="gold-line mx-auto mt-4" />
        </div>

        {/* Accordion — one item open at a time */}
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="border-b border-[var(--tender-gold)]/20"
            >
              <AccordionTrigger className="text-[var(--tender-text-dark)] text-base md:text-lg font-medium text-left hover:no-underline hover:text-[var(--tender-navy)] py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--tender-text-muted)] text-sm md:text-base leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
