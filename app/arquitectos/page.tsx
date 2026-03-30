import ContactSection from "@/components/home/contact-section"

import HeroArquitectos from "@/components/arquitectos/hero-arquitectos"
import BeneficiosArquitectos from "@/components/arquitectos/beneficios-arquitectos"
import CtaShowroomArquitectos from "@/components/arquitectos/cta-showroom-arquitectos"
import RazonesElegirnos from "@/components/arquitectos/razones-elegirnos"

export const metadata = {
  title: "Arquitectos | Tender® Original",
  description: "Programa de beneficios exclusivos para arquitectos y constructoras. Venta corporativa, asesoramiento en obra y librerías digitales (CAD/BIM) de Tender®.",
}

export default function ArquitectosPage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://tender.com.ar/arquitectos",
    "name": "Arquitectos e Institucional | Tender®",
    "description": "Beneficios exclusivos, venta corporativa y librerías digitales de Tender® para arquitectos y proyectos de construcción."
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