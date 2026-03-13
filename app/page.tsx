import Navbar from "@/components/navbar"
import HeroSlider from "@/components/hero-slider"
import ProductsSection from "@/components/products-section"
import SpacesSection from "@/components/spaces-section"
import TestimonialsSection from "@/components/testimonials-section"
import ServicesSection from "@/components/services-section"
import ContactSection from "@/components/contact-section"
import BrandOriginSection from "@/components/brand-origin-section"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero con slider */}
        <HeroSlider />

        {/* Productos Destacados */}
        <ProductsSection />

        {/* Todo Espacio Tiene un Tender (categorías de producto) */}
        <SpacesSection />

        {/* Nuestros Clientes (testimonios) */}
        <TestimonialsSection />

        {/* ¿Sabías que se llaman "tender" por nosotros? */}
        <BrandOriginSection />

        {/* Servicios (Garantía, Técnico, Arquitectos, Distribuidores) */}
        {/* <ServicesSection /> */}

        {/* Formulario de Contacto */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
