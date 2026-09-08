import Image from 'next/image';
import { Info, MapPin } from 'lucide-react';
import { Product } from '@/types/products';
import Link from 'next/link';

interface ProductInfoSectionsProps {
  product: Product;
}

/**
 * Contenido estático del detalle de producto: video, descripción/características,
 * mapa de envíos y recomendaciones. Server component — sin interactividad.
 */
export default function ProductInfoSections({ product }: ProductInfoSectionsProps) {
  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* --- SECCIÓN VIDEO --- */}
      <div className="mt-32 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif text-(--tender-navy) mb-4">Funcionamiento en Detalle</h2>
          <div className="gold-line" />
        </div>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <iframe src={product.videoUrl} title="Product Video" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
        </div>
      </div>

      {/* --- DESCRIPCIÓN Y CARACTERÍSTICAS --- */}
      <div className="mt-32 border-t border-gray-100 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif text-(--tender-navy) mb-4">Descripción y Características</h2>
            <div className="w-12 h-0.5 bg-(--tender-cyan) mb-6"></div>
            <h3 className="text-xl font-bold text-(--tender-navy-mid) mb-4 leading-snug">
              {product.description.split(':')[0]}
            </h3>
          </div>
          <div className="md:col-span-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex flex-col gap-1 border-b border-gray-50 pb-4">
                  <span className="text-[11px] font-black text-(--tender-cyan) uppercase tracking-widest">{feature.title}</span>
                  <span className="text-sm text-(--tender-text-dark) leading-relaxed">{feature.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- MAPA / ENVÍOS --- */}
      <div className="mt-32 bg-(--tender-gray-bg) rounded-[3rem] p-8 md:p-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-(--tender-cyan) shadow-sm">
              <MapPin size={24} />
            </div>
            <h2 className="text-3xl font-serif text-(--tender-navy)">Zonas de Instalación y Envíos</h2>
            <p className="text-sm text-(--tender-text-dark) leading-relaxed">
              Consultá por instalación paga, reparación y asesoramiento. La cobertura incluye CABA, zona norte del AMBA y sectores del primer cordón, siempre sujeta a consulta.
            </p>
          </div>
          <div className="flex-[2]">
            <Image
              src="/images/producto/instalaciones-envios.png" alt="Mapa"
              width={1200} height={700}
              className="w-full h-auto border border-white shadow-2xl rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 800px"
            />
          </div>
        </div>
      </div>

      {/* --- RECOMENDACIONES DE INSTALACIÓN --- */}
      <div className="mt-32 max-w-4xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-gray-800 flex items-center justify-center gap-3">
            <Info size={24} className="text-gray-400" />
            Recomendaciones de Instalación
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-lg text-gray-600 leading-relaxed">
              Al medir el espacio disponible para elegir tu Tender, recordá dejar un margen mínimo de <strong className="text-gray-900 font-semibold">5 cm libres de cada lado</strong>.
            </p>
          </div>

          <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50/50">
            <p className="text-lg text-gray-600 leading-relaxed">
              Los modelos colgantes en techos de policarbonato, vidrio o espacios sin techo se pueden instalar, pero requieren <strong className="text-gray-900 font-semibold">presupuesto previo</strong>.
            </p>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-4xl text-center text-sm text-(--tender-text-muted)">
        Antes de comprar, <Link href="/como-elegir-un-tender" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">revisá cómo elegir un tender según tu espacio</Link> o <Link href="/servicio-tecnico" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">consultá por instalación y servicio técnico</Link>.
      </p>
    </div>
  );
}
