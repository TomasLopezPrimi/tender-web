"use client"

import { useState, useRef } from "react"
import { Phone } from "lucide-react"
import { config } from "@/config"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    consulta: "",
    newsletter: false,
    captcha: "",
  })

  const formRef = useRef<HTMLFormElement>(null)

  const WHATSAPP_NUMBER = config.whatsappNumber

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submit del formulario tradicional
    alert("Formulario enviado (mock)")
  }

  const handleWhatsApp = () => {

    const text = `Hola Tender, soy ${formData.nombre} ${formData.apellido}.
Email: ${formData.email}

Mi consulta es:
${formData.consulta}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contacto" className="py-20 bg-[var(--tender-gray-bg)]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left side - Info */}
          <div>
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide mb-2"
            >
              Contactanos
            </h2>
            <div className="gold-line !mx-0 mb-6" />
            <p className="text-[var(--tender-text-muted)] text-base mb-8">
              Dejanos tus datos y un representante se comunicará a la brevedad
            </p>

            {/* Phone numbers */}
            <div className="space-y-4">
              {config.allNumbers.map((phone) => (
                <a
                  key={phone.number}
                  href={phone.href}
                  className="flex items-center gap-3 text-[var(--tender-navy)] hover:text-[var(--tender-cyan)] transition-colors group"
                >
                  <Phone
                    size={18}
                    className="text-[var(--tender-cyan)] group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">{phone.label} · {phone.number}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right side - Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-border/50">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="apellido"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    required
                    value={formData.apellido}
                    onChange={(e) =>
                      setFormData({ ...formData, apellido: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="consulta"
                  className="block text-sm font-medium text-[var(--tender-text-dark)] mb-1.5"
                >
                  Dejanos tu consulta <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="consulta"
                  required
                  rows={4}
                  value={formData.consulta}
                  onChange={(e) =>
                    setFormData({ ...formData, consulta: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--tender-cyan)] focus:ring-1 focus:ring-[var(--tender-cyan)] outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={formData.newsletter}
                  onChange={(e) =>
                    setFormData({ ...formData, newsletter: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-border text-[var(--tender-cyan)] focus:ring-[var(--tender-cyan)]"
                />
                <label
                  htmlFor="newsletter"
                  className="text-sm text-[var(--tender-text-muted)]"
                >
                  Deseo recibir más información y ofertas
                </label>
              </div> */}

            

              {/* BOTONES DE ENVÍO */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Botón tradicional */}
                {/* <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--tender-cyan)] hover:bg-[var(--tender-cyan)]/90 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[var(--tender-cyan)]/25"
                >
                  <Send size={18} />
                  Enviar
                </button> */}

                {/* Botón WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#25d366]/25"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
