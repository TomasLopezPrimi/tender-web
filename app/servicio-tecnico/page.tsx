

import TechServiceHero from "@/components/tech-service/tech-hero"
import TechManuals from "@/components/tech-service/tech-manuals"
import TechContactSection from "@/components/tech-service/tech-contact-section"
import TechIntegralService from "@/components/tech-service/tech-integral-service"
import TensionSystem from "@/components/tech-service/tech-tension-system"
import InstallationsAndShipping from "@/components/instalacion"

export const metadata = {
  title: "Servicio Técnico | Tender®",
  description: "Manuales de instalación, service oficial y garantía de productos Tender.",
}

export default function ServicioTecnicoPage() {
  return (
    <>
      <main className="min-h-screen">
        <TechServiceHero />
        <TechIntegralService />
        <TensionSystem />
        <InstallationsAndShipping />
        <TechManuals />
        <TechContactSection />
      </main>
    </>
  )
}