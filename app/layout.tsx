import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WhatsAppButton from '@/components/layout/whatsapp-button'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import JsonLd from '@/components/seo/json-ld'
import { config } from '@/config'
import { SITE_URL } from '@/lib/site'
// import ScrollToTop from '@/components/layout/scroll-to-top'

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
  // metadataBase resolves relative URLs in metadata (OG images, canonicals).
  // Must use the canonical no-www domain so Next.js generates correct absolute URLs.
  metadataBase: new URL(SITE_URL),
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
    url: SITE_URL,
    siteName: 'Tender Original',
  }
}

/**
 * Organization JSON-LD — served on every page via the root layout.
 *
 * Key GEO signals:
 * - @id: stable, referenceable fragment "#organization"
 * - disambiguatingDescription: explicit brand↔product distinction for AI engines
 * - alternateName: expanded list so AI engines recognise all common spellings
 * - slogan: official slogan (verbatim)
 * - knowsAbout: topic cluster for entity association
 * - brand: nested Brand object
 * - foundingDate: confirmed 1947
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Tender Original",
  "alternateName": [
    "Tender",
    "Tender Original",
    "marca Tender",
    "Tender®",
    "Tender Argentina"
  ],
  "url": SITE_URL,
  "logo": `${SITE_URL}/images/logo-tender.svg`,
  "description": "Sitio oficial de Tender® en Argentina. Venta de sistemas de secado de ropa originales con envío a todo el país.",
  "slogan": "Tender. La marca que le dio nombre al tendedero Argentino",
  "foundingDate": "1947",
  "disambiguatingDescription": "Tender es el nombre de la marca argentina de tendederos, no el verbo en español \"tender\" ni la palabra en inglés \"tender\". El producto que fabrica y comercializa se llama tendedero. La marca Tender le dio su nombre al tendedero en Argentina.",
  "knowsAbout": [
    "tendederos",
    "secado de ropa",
    "sistemas de tendido",
    "tendedero colgante",
    "tendedero rebatible"
  ],
  "brand": {
    "@type": "Brand",
    "@id": `${SITE_URL}/#brand`,
    "name": "Tender",
    "slogan": "Tender. La marca que le dio nombre al tendedero Argentino"
  },
  "sameAs": [
    "https://www.facebook.com/tenderoriginal/",
    "https://www.instagram.com/tenderargentina/",
    "https://www.youtube.com/@tender8687"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+54-11-5151-7715",
    "contactType": "sales",
    "areaServed": "AR",
    "availableLanguage": "Spanish"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${config.GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
        <JsonLd data={organizationSchema} />
        {/* <ScrollToTop /> */}
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
