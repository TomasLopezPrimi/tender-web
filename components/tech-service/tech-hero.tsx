export default function TechServiceHero() {
  return (
    <section className="relative bg-linear-to-b from-(--tender-navy) to-(--tender-navy-mid) py-24 md:py-32 text-center overflow-hidden">

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 z-10 flex flex-col items-center">
        
        <h1 className="animate-fade-in-up text-4xl md:text-6xl font-serif text-white tracking-tight drop-shadow-md">
          Servicio Técnico
          <sup className="text-(--tender-cyan) text-2xl md:text-4xl top-[-0.4em] ml-1">®</sup>
        </h1>
        

        <div 
          className="animate-fade-in-up gold-line mt-8 mb-6 shadow-[0_0_12px_rgba(200,160,50,0.4)]" 
          style={{ animationDelay: '150ms' }} 
        />
        
        <p 
          className="animate-fade-in-up text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-balance" 
          style={{ animationDelay: '300ms' }}
        >
          Estamos para ayudarte. Aquí encontrarás toda la información necesaria para la instalación, 
          cuidado y mantenimiento de tus productos <strong className="font-semibold text-white">Tender®</strong>.
        </p>

      </div>
    </section>
  )
}