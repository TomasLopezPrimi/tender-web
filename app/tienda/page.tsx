import type { Metadata } from 'next'
import ProductsSection from '@/components/products-section';
import Navbar from '@/components/navbar';

import WhatsAppButton from '@/components/whatsapp-button';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Tienda - Tender®',
  description: 'Comprá Tender® Online! Comprar Tender colgante, Tender Rebatible y Tender Plegable. Todos los modelo y todas las medidas de Tender Original.',
}

export default function TiendaPage() {


    return (
      <main className="min-h-screen bg-background">
        <Navbar />

        
        <div className="pt-24 pb-8 md:pt-32 md:pb-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[var(--tender-text-dark)] tracking-wide text-balance">
            Tienda <span className="text-[var(--tender-navy)]">Tender</span>
            <sup className="text-lg md:text-2xl align-super">®</sup>
          </h1>
          <div className="gold-line mt-4 mx-auto" />
          <p className="mt-4 text-[var(--tender-text-muted)] text-sm md:text-base">
            Todos los modelos y medidas originales directos de fábrica.
          </p>
        </div>
        
        {/* Contenedor de la grilla */}
        <div className="pb-16">
            <ProductsSection needTitle={false}/>
        </div>

        <Footer />
        <WhatsAppButton />
      </main>
    );
}