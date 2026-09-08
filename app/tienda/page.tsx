import type { Metadata } from 'next'
import TiendaHero from '@/components/tienda/tienda-hero'
import ProductsSection from '@/components/productos/products-section';
import { absoluteUrl } from '@/lib/site';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Comprar tenders de ropa originales | Tender®',
  description: 'Comprá online tenders de ropa Tender®: compará modelos, medidas y precios de colgantes y rebatibles.',
  alternates: {
    canonical: absoluteUrl('/tienda'),
  },
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
