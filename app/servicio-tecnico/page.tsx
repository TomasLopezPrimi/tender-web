import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import TechServiceHero from "@/components/tech-service/tech-hero"
import TechManuals from "@/components/tech-service/tech-manuals"
// import TechVideoSection from "@/components/tech-service/tech-video-section"
import TechContactSection from "@/components/tech-service/tech-contact-section"
import TechIntegralService from "@/components/tech-service/tech-integral-service"

export const metadata = {
  title: "Servicio Técnico | Tender®",
  description: "Manuales de instalación, service oficial y garantía de productos Tender.",
}

export default function ServicioTecnicoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <TechServiceHero />
        <TechIntegralService />
        <TechManuals />
        <TechContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}