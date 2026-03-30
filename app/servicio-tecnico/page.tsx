

import TechServiceHero from "@/components/servicio-tecnico/tech-hero"
import TechManuals from "@/components/servicio-tecnico/tech-manuals"
import TechContactSection from "@/components/servicio-tecnico/tech-contact-section"
import TechIntegralService from "@/components/servicio-tecnico/tech-integral-service"
import TensionSystem from "@/components/servicio-tecnico/tech-tension-system"
import InstallationsAndShipping from "@/components/servicio-tecnico/instalacion"

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