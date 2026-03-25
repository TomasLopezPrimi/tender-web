import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tender Original - Tender®', 
    template: '%s | Tender®'
  },
  description: 'TENDER® ORIGINAL PREMIUM. Tendederos para secar y cuidar todas tus prendas. Modelos disponibles: Colgante de techo, Rebatible y Plegable. ¡Encontrá el tuyo!',
  generator: 'tomas-lopez-primi',
  icons: {
    icon: "/icon.png", 
    apple: "/apple-icon.png", 
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://www.tender.com.ar',
    siteName: 'Tender Original',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  // 2. Preparamos los Datos Estructurados (Schema) para el Panel de Conocimiento
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Tender Original",
    "url": "https://www.tender.com.ar",
    "logo": "https://www.tender.com.ar/images/logo-tender.svg", 
    "sameAs": [
      "https://www.facebook.com/tenderoriginal/",
      "https://www.instagram.com/tenderargentina/",
      "https://www.youtube.com/@tender8687"
    ]
  };

  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}