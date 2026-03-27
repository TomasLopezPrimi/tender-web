import HeroSlider from "@/components/hero-slider"
import ProductsSection from "@/components/products-section"
import SpacesSection from "@/components/spaces-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactSection from "@/components/contact-section"
import BrandOriginSection from "@/components/brand-origin-section"

export default function HomePage() {

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://tender.com.ar",
    "name": "Tender®",
    "alternateName": ["Tender Tendederos", "Tender Argentina", "Tender Original"],
    "description": "Sitio oficial de Tender®: Tendederos colgantes de techo y pared de alta resistencia."
  };


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <main>
        <HeroSlider />
        <ProductsSection needTitle={true}/>
        <SpacesSection />
        <TestimonialsSection />
        <BrandOriginSection />
        <ContactSection />
      </main>
    </>
  )
}
