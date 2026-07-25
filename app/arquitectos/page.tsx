import ContactSection from "@/components/home/contact-section"

import HeroArquitectos from "@/components/arquitectos/hero-arquitectos"
import BeneficiosArquitectos from "@/components/arquitectos/beneficios-arquitectos"
import CtaShowroomArquitectos from "@/components/arquitectos/cta-showroom-arquitectos"
import RazonesElegirnos from "@/components/arquitectos/razones-elegirnos"

export const metadata = {
  title: "Arquitectos y profesionales | Tender® Original",
  description: "Programa de beneficios para arquitectos, interioristas, constructoras y profesionales. Venta corporativa, asesoramiento en obra y librerías digitales (CAD/BIM) de Tender®.",
}

export default function ArquitectosPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://tender.com.ar/arquitectos",
    "name": "Arquitectos y profesionales | Tender®",
    "description": "Beneficios, venta corporativa y librerías digitales de Tender® para arquitectos, interioristas, constructoras y proyectos profesionales."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      
      <main className="min-h-screen bg-background">
        
        <HeroArquitectos />
        
        <BeneficiosArquitectos />
    
        <CtaShowroomArquitectos />
        
        <RazonesElegirnos />
        
        <div id="consultas">
          <ContactSection />
        </div>

      </main>
    </>
  )
}
