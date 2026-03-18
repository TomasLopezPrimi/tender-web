import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
// import CartBubble from '@/components/cart-bubble'

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
  title: 'Tender®',
  description: 'Tender® ofrece tendederos colgantes de techo de alta calidad. Soluciones elegantes para lavar y secar ropa en cualquier espacio.',
  generator: 'tomas-primi',
  icons: {
    icon: "/icon.png", 
    apple: "/apple-icon.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {/* <CartBubble /> */}
        <Analytics />
      </body>
    </html>
  )
}
