// components/tech-service/tech-hero.tsx
import Image from "next/image"

export default function TechServiceHero() {
  return (
    <section className="relative flex min-h-[50vh] w-full items-center justify-center overflow-hidden bg-[var(--tender-navy)] py-24 md:py-32">
      
      {/* Imagen de Fondo */}
      <Image
        src="/images/servicio-tecnico/tender-instalacion.jpg"
        alt="Instalación y Servicio Técnico Tender"
        fill
        className="object-cover object-top opacity-60"
        priority
      />

      {/* Gradiente Overlay para asegurar legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--tender-navy)]/90 via-[var(--tender-navy)]/60 to-[var(--tender-navy)]/30" />

      {/* Patrón sutil superpuesto (opcional, le da un toque técnico) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        
        <h1 className="animate-fade-in-up text-4xl font-serif tracking-tight text-white drop-shadow-md md:text-5xl lg:text-6xl">
          Servicio Técnico
          <sup className="top-[-0.4em] ml-1 text-2xl text-[var(--tender-cyan)] md:text-4xl">®</sup>
        </h1>
        
        <div 
          className="gold-line animate-fade-in-up mb-6 mt-8 shadow-[0_0_12px_rgba(200,160,50,0.4)]" 
          style={{ animationDelay: '150ms' }} 
        />
        
        <p 
          className="animate-fade-in-up mx-auto max-w-2xl text-balance text-lg font-light leading-relaxed text-white/90 md:text-xl" 
          style={{ animationDelay: '300ms' }}
        >
          Estamos para ayudarte. Aquí encontrarás toda la información necesaria para la instalación, 
          cuidado y mantenimiento de tus productos <strong className="font-semibold text-white">Tender®</strong>.
        </p>

      </div>
    </section>
  )
}