// components/tech-service/tech-hero.tsx
import Image from "next/image"

export default function TechServiceHero() {
  return (
    <section className="relative flex min-h-[65vh] w-full items-center justify-center overflow-hidden bg-black py-24 md:py-32">
      
      {/* 1. IMAGEN CON MÁS IMPORTANCIA: Opacidad al 90% para que se vea casi total */}
      <Image
        src="/images/servicio-tecnico/tender-instalacion.jpg"
        alt="Instalación y Servicio Técnico Tender"
        fill
        className="object-cover object-center opacity-90" 
        priority
      />

      {/* 2. OVERLAY MÍNIMO: Solo un tinte para unificar con la marca, muy sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tender-navy)]/90 via-[var(--tender-navy)]/60 to-[var(--tender-navy)]/30" />

      {/* 3. GRADIENTE DE SEGURIDAD: Solo en la base para que el texto respire */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        
        {/* Título con SOMBRA FUERTE para resaltar sobre la imagen clara */}
        <h1 className="animate-fade-in-up text-4xl font-serif tracking-tight text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] md:text-6xl lg:text-7xl">
          Servicio Técnico
        </h1>
        
        <div 
          className="gold-line animate-fade-in-up mb-6 mt-8 h-[3px] w-28 bg-yellow-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
          style={{ animationDelay: '150ms' }} 
        />
        
        {/* Párrafo con peso Font-Bold y sombra para máxima legibilidad */}
        <p 
          className="mt-6 animate-fade-in-up mx-auto max-w-2xl text-balance text-lg font-semibold leading-relaxed text-white drop-shadow-[0_2px_10px_rgba(0,0,0,1)] md:text-2xl" 
          style={{ animationDelay: '300ms' }}
        >
          Estamos para ayudarte<br></br><br></br>
          Aquí encontrarás toda la información para la 
          <span className="text-cyan-200"> instalación y mantenimiento </span>
          de tus productos <strong className="text-white">Tender®</strong>.
        </p>

      </div>
    </section>
  )
}