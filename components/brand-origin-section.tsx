import Image from "next/image"

export default function BrandOriginSection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="brand-origin-heading">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--tender-navy)]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <span className="inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border border-[var(--tender-gold)]/40 text-[var(--tender-gold)] mb-8">
              La Marca Original
            </span>

            <h2
              id="brand-origin-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight"
            >
              ¿Sabías que se llaman{" "}
              <span className="italic" style={{ color: "var(--tender-gold)" }}>
                &ldquo;tender&rdquo;
              </span>{" "}
              <br className="hidden md:block" />
              por nosotros?
            </h2>

            <div
              className="mt-6 h-0.5 w-16 lg:mx-0 mx-auto"
              style={{
                background: "linear-gradient(90deg, var(--tender-gold), var(--tender-gold-light))",
              }}
            />

            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-lg lg:mx-0 mx-auto">
              Desde hace más de 70 años, <strong className="text-white font-semibold">Tender®</strong> es sinónimo de
              tendedero de calidad. Fuimos los primeros, y con el tiempo nuestro nombre se convirtió en la
              forma de llamar al producto en sí.
            </p>

            <p className="mt-4 text-white/60 text-sm md:text-base leading-relaxed max-w-lg lg:mx-0 mx-auto">
              Cuando alguien dice <em>&ldquo;necesito un tender&rdquo;</em>, en realidad está hablando de nosotros.
              Somos la marca que creó la categoría en Argentina y seguimos siendo referentes en
              diseño, calidad y durabilidad.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-white font-bold">70+</span>
                <span className="text-xs text-white/50 uppercase tracking-widest mt-1 block">Años de historia</span>
              </div>
              <div
                className="w-px h-16 self-center"
                style={{ background: "linear-gradient(180deg, transparent, var(--tender-gold)/30, transparent)" }}
              />
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-white font-bold">30+</span>
                <span className="text-xs text-white/50 uppercase tracking-widest mt-1 block">Medidas disponibles</span>
              </div>
              <div
                className="w-px h-16 self-center"
                style={{ background: "linear-gradient(180deg, transparent, var(--tender-gold)/30, transparent)" }}
              />
              <div>
                <span className="block text-3xl md:text-4xl font-serif text-white font-bold">100%</span>
                <span className="text-xs text-white/50 uppercase tracking-widest mt-1 block">Industria Argentina</span>
              </div>
            </div>
          </div>

          {/* Right - Logo visual */}
          <div className="relative flex items-center justify-center">
            {/* Glow effect behind logo */}
            <div
              className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, var(--tender-cyan), transparent 70%)",
              }}
            />
            <div className="relative text-center">
              <img
                src="/images/logo-tender.svg"
                alt="Tender® - La Marca Original"
                className="h-16 md:h-24 w-auto select-none mx-auto"
                style={{ filter: "brightness(0) invert(1)" }}
                draggable={false}
              />
              <div
                className="mt-4 h-0.5 w-24 mx-auto"
                style={{
                  background: "linear-gradient(90deg, transparent, var(--tender-gold), transparent)",
                }}
              />
              <p className="mt-4 text-white/40 text-xs uppercase tracking-[0.3em] font-medium">
                La marca original desde 1960
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
