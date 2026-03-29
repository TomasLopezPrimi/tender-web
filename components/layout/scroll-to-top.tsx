"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // 1. Si la URL tiene un ancla (ej: /#contacto), cortamos la ejecución acá.
    // El 'scroll-behavior: smooth' del CSS se va a encargar de llevarte a esa sección.
    if (window.location.hash) return;

    // 2. Si no hay ancla (es una página nueva limpia), subimos suavemente al 100%.
    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 50);

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null 
}