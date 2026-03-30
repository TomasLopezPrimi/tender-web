import HeroSlider from "@/components/home/hero-slider"
import ProductsSection from "@/components/productos/products-section"
import SpacesSection from "@/components/home/spaces-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import ContactSection from "@/components/home/contact-section"
import BrandOriginSection from "@/components/home/brand-origin-section"

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
