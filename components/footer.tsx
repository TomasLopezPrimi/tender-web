import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[var(--tender-navy-mid)] text-white" aria-label="Pie de página">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left column */}
          <div>
            {/* Real logo image */}
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="h-7 w-auto select-none"
              style={{ filter: "brightness(0) invert(1)" }}
              draggable={false}
            />
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/80">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>Showroom de lun a vie de 9 a 17 h</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-white/80">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>Av. San Martín 2513 (Florida, Vicente López)</span>
              </div>
              <a
                href="mailto:ventas@tender.com.ar"
                className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors"
              >
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-[var(--tender-cyan)]" aria-hidden="true" />
                <span>ventas@tender.com.ar</span>
              </a>
            </div>

            {/* Social */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <Instagram size={18} />, label: "Instagram", href: "#instagram" },
                { icon: <Facebook size={18} />, label: "Facebook", href: "#facebook" },
                { icon: <Youtube size={18} />, label: "YouTube", href: "#youtube" },
                { icon: <Linkedin size={18} />, label: "LinkedIn", href: "#linkedin" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-[var(--tender-cyan)] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right column - Phone numbers */}
          <div className="md:text-right">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--tender-cyan)] mb-4">
              Teléfonos
            </h3>
            <div className="space-y-3">
              {[
                { label: "+54 11 5151-7715", href: "tel:+541151517715" },
                { label: "+54 11 4931-6465", href: "tel:+541149316465" },
                { label: "+549 11 3187-6811", href: "tel:+5491131876811" },
              ].map((phone) => (
                <a
                  key={phone.label}
                  href={phone.href}
                  className="flex items-center gap-2 md:justify-end text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone size={14} className="text-[var(--tender-cyan)]" aria-hidden="true" />
                  <span>{phone.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[var(--tender-navy)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} Tender Argentina. Todos los derechos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#terminos" className="text-white/50 hover:text-white/80 text-xs transition-colors">
              Términos y condiciones
            </a>
            <a href="#privacidad" className="text-white/50 hover:text-white/80 text-xs transition-colors">
              Políticas de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
