"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

interface NavItem {
  label: string
  href: string
  highlighted?: boolean
  hasDropdown?: boolean
}

const navItems: NavItem[] = [
  { label: "INICIO", href: "/" },
  { label: "TIENDA", href: "/#productos", 
    // highlighted: true 
  },
  { label: "PRODUCTOS", href: "/#productos", 
    // hasDropdown: true 
  },
  { label: "SERVICIO TÉCNICO", href: "/servicio-tecnico" },
  { label: "ARQUITECTOS", href: "/arquitectos" },
  { label: "CONTACTO", href: "/#contacto" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Logo */}
        <div className="flex items-center justify-center pt-3 pb-1">
          <Link href="/" className="shrink-0" aria-label="Tender inicio">
            <img
              src="/images/logo-tender.svg"
              alt="Tender®"
              className="h-7 w-auto"
              draggable={false}
            />
          </Link>

          {/* Mobile toggle - absolute positioned */}
          <button
            className="lg:hidden absolute right-4 top-3 p-2 text-(--tender-navy) hover:text-(--tender-cyan) transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Row 2: Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 pb-2.5" aria-label="Navegación principal">
          {navItems.map((item) => (
            <NavLink key={item.label} item={item} />
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top duration-300" role="navigation" aria-label="Menú móvil">
          <div className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                  item.highlighted
                    ? "bg-(--tender-cyan) text-white text-center"
                    : "text-(--tender-navy) hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink({ item }: { item: NavItem }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded ${
        item.highlighted
          ? "bg-(--tender-cyan) text-white hover:bg-(--tender-cyan)/90"
          : "text-(--tender-text-dark) hover:text-(--tender-cyan)"
      }`}
    >
      {item.label}
      {item.hasDropdown && (
        <ChevronDown size={13} className="opacity-70" aria-hidden="true" />
      )}
    </Link>
  )
}