import type { Metadata } from 'next'
import TiendaHero from '@/components/tienda/tienda-hero'
import ProductsSection from '@/components/productos/products-section';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Tienda - Tender®',
  description: 'Comprá Tender® Online! Comprar Tender colgante, Tender Rebatible y Tender Plegable. Todos los modelo y todas las medidas de Tender Original.',
}

export default function TiendaPage() {
  return (
    <>
      <TiendaHero />

      <div className="pb-16 pt-8 relative z-0 bg-background">
        <ProductsSection needTitle={false} />
      </div>
    </>
  );
}