import type { Metadata } from 'next'
import ProductsSection from '@/components/productos/products-section';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Tienda - Tender®',
  description: 'Comprá Tender® Online! Comprar Tender colgante, Tender Rebatible y Tender Plegable. Todos los modelo y todas las medidas de Tender Original.',
}

export default function TiendaPage() {


    return (
      <>
      <main className="h-[15vh] min-h-[270px] 2xl:max-h-[900px] bg-[var(--tender-navy-mid)] border-b-4 border-[var(--tender-gold)] relative z-10 shadow-xl shadow-black/20">

        
        <div className="pt-18 pb-8 md:pt-22 md:pb-8 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white tracking-wide text-balance">
            <span className="text-[var(--tender-gray-bg)]">Tienda - Tender</span>
            <sup className="text-lg md:text-2xl align-super">®</sup>
          </h1>
          {/* <div className="gold-line mt-4 mx-auto" /> */}
          <p className="mt-4 text-[var(--tender-gray-bg)] text-sm md:text-base opacity-90">
            Todos los modelos y medidas originales directos de fábrica.
          </p>
        </div>
        
      </main>
      <div className="pb-16 pt-8 relative z-0 bg-background">
            <ProductsSection needTitle={false}/>
        </div>
        </>
    );
}