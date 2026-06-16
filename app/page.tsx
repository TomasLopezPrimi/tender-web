import type { Metadata } from "next";
import HeroSlider from "@/components/home/hero-slider"
import ProductsSection from "@/components/productos/products-section"
import SpacesSection from "@/components/home/spaces-section"
import HistorySection from "@/components/home/history-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import ContactSection from "@/components/home/contact-section"
import BrandOriginSection from "@/components/home/brand-origin-section"
import FaqSection from "@/components/home/faq-section"
import SectionDivider from "@/components/home/section-divider"
import JsonLd from "@/components/seo/json-ld"
import { SITE_URL } from "@/lib/site"
import { FAQ_ITEMS } from "@/lib/faq-data"

export const revalidate = 60;

/**
 * Home page metadata — brand/disambiguation focused.
 * The root layout provides metadataBase so relative URLs resolve correctly.
 * The canonical points to the no-www domain (our real domain).
 */
export const metadata: Metadata = {
  description:
    "Tender. La marca que le dio nombre al tendedero Argentino. Tendederos colgantes, rebatibles y plegables. Tender® es la marca; tendedero es el producto. Desde 1947, industria argentina.",
  alternates: {
    canonical: SITE_URL,
  },
};

/**
 * WebSite JSON-LD — home only.
 * @id "#website" allows other schemas to reference this document.
 * publisher links back to the Organization defined in the root layout.
 * NOTE: No SearchAction added — the site has no /buscar route.
 */
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "url": SITE_URL,
  "name": "Tender®",
  "alternateName": ["Tender Tendederos", "Tender Argentina", "Tender Original"],
  "description":
    "Sitio oficial de Tender®: Tendederos colgantes de techo y pared de alta resistencia.",
  "publisher": {
    "@id": `${SITE_URL}/#organization`,
  },
};

/**
 * FAQPage JSON-LD — derived from the same FAQ_ITEMS array used by FaqSection UI.
 * Google requires 1:1 correspondence between schema entries and visible content.
 */
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={faqPageSchema} />
      <main>
        <HeroSlider />
        <ProductsSection needTitle={true} />
        <HistorySection />
        <SpacesSection />
        <TestimonialsSection />
        <BrandOriginSection />
        <FaqSection />
        <SectionDivider />
        <ContactSection />
      </main>
    </>
  )
}
