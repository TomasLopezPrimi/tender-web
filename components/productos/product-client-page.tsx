'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCartIcon, Check, Ruler, ChevronDown, MapPin, Info } from 'lucide-react';
import { formatPrice } from "@/lib/products";
import { useCartStore } from '@/hooks/use-cart-store';
import { PricingConfig, ProductSize, Product } from '@/types/products';
import PromoLabel from '@/components/ui/promo-label';
import {
  applyCombinedDiscount,
  getCombinedDiscountPercentage,
  getGlobalDiscountLabel,
  shouldShowGlobalDiscountLabel,
} from '@/lib/pricing';

interface ProductClientPageProps {
  product: Product;
  sku: string;
  pricingConfig: PricingConfig;
}

export default function ProductClientPage({ product, sku, pricingConfig }: ProductClientPageProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const [isAdded, setIsAdded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setActiveImage(product.images[0]);
  }, [sku, product.images]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sizeObj = product.sizes.find(s => s.name === e.target.value);
    setSelectedSize(sizeObj || null);
  };

  const hasItemsInCart = items.length > 0;
  const displayPrice = selectedSize ? formatPrice(selectedSize.price) : product.priceRange;

  const globalLabel = getGlobalDiscountLabel(pricingConfig);
  const showGlobalLabel = shouldShowGlobalDiscountLabel(pricingConfig);

  const priceWithAllDiscounts = selectedSize
    ? applyCombinedDiscount(selectedSize.price, pricingConfig, 'TRANSFERENCIA')
    : null;

  const priceWithDiscount = priceWithAllDiscounts !== null
    ? formatPrice(priceWithAllDiscounts)
    : null;

  const totalDiscountPct = getCombinedDiscountPercentage(pricingConfig, 'TRANSFERENCIA');

  let hangingSpace = null;
  if (selectedSize) {
    const threadsMatch = sku.match(/(\d+)h$/i);
    const threads = threadsMatch ? parseInt(threadsMatch[1], 10) : 0;
    const lengthStr = selectedSize.name.split('x')[0].trim().replace(',', '.');
    const length = parseFloat(lengthStr);
    if (threads > 0 && !isNaN(length)) {
      hangingSpace = ((threads + 1) * (length - 0.08)).toLocaleString('es-AR', { minimumFractionDigits: 2 });
    }
  }

  return (
    <main className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 pt-12 max-w-7xl">

        {showGlobalLabel && <div className="mb-6"><PromoLabel label={globalLabel} variant="hero" /></div>}

        {/* --- CABECERA / BREADCRUMBS --- a futuro las podemos agregar haciendo bien los links */}
        {/* <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] text-(--tender-text-muted) mb-10 overflow-x-auto whitespace-nowrap pb-2">
          {product.categoryPath.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="hover:text-(--tender-cyan) cursor-pointer transition-colors">{item}</span>
              {index < product.categoryPath.length - 1 && <span className="mx-3 opacity-30">/</span>}
            </div>
          ))}
        </nav> */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">
          {/* COLUMNA IZQUIERDA: GALERÍA */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[4/3] w-full bg-(--tender-gray-bg) rounded-xl overflow-hidden border border-gray-100 group cursor-zoom-in">
              <Image src={activeImage} alt={product.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
              <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm text-(--tender-navy)">
                <Search size={20} />
              </div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-(--tender-cyan) scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO COMPRA */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-6 flex items-center justify-between">
              <Image src="/images/producto/garantia.png" alt="Garantía" width={50} height={50} className="opacity-80" />
              <span className="text-[11px] font-bold text-(--tender-text-muted) tracking-widest uppercase">SKU: {product.code}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-(--tender-navy) leading-tight mb-4">{product.title}</h1>
            {/* <div className="text-2xl font-bold text-(--tender-cyan) tracking-tight mb-8">
              {displayPrice} <span className="text-xs font-normal ml-2 opacity-70 text-(--tender-navy)">IVA INCLUIDO</span>
            </div> */}
            {/* BLOQUE DE PRECIO CON DESCUENTO POR TRANSFERENCIA */}
<div className="mb-8 min-h-[70px] flex flex-col justify-end">
  {selectedSize ? (
    <div className="animate-in fade-in slide-in-from-left-2 duration-300">
      {/* Precio Original Tachado */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-base text-gray-400 line-through decoration-gray-300">
          {formatPrice(selectedSize.price)}
        </span>
        <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 rounded-full tracking-wide">
          {totalDiscountPct}% OFF
        </span>
      </div>
      
      {/* Precio con descuento */}
      <div className="flex flex-col">
        <div className="text-4xl font-bold text-(--tender-cyan) tracking-tight flex items-baseline gap-2">
          {priceWithDiscount}
          {/* <span className="text-[10px] font-normal text-(--tender-navy) opacity-70 tracking-widest uppercase">
            Por Transferencia
          </span> */}
        </div>
        {/* <span className="text-[10px] font-normal mt-1 opacity-50 text-(--tender-navy) tracking-widest uppercase"> */}
          {/* IVA INCLUIDO  */}
          {/* • O {formatPrice(selectedSize.price)} con tarjeta */}
        {/* </span> */}
      </div>
      </div>
        ) : (
          /* Vista inicial cuando no hay medida seleccionada */
          <div className="text-2xl font-bold text-(--tender-cyan) tracking-tight">
            {product.minPrice ? "Desde " + formatPrice(product.minPrice) : ""} 
            <span className="text-xs font-normal ml-2 opacity-70 text-(--tender-navy) uppercase tracking-widest">
              Iva incluido
            </span>
          </div>
        )}
      </div>
            <p className="text-(--tender-text-dark) leading-relaxed text-sm mb-10 border-l-2 border-(--tender-cyan)/20 pl-4 italic">{product.description}</p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-(--tender-navy)">Medida del Tender (m)</label>
                {selectedSize && <button onClick={() => setSelectedSize(null)} className="text-[10px] text-(--tender-cyan) underline font-bold uppercase tracking-wider">Limpiar</button>}
              </div>
              <div className="relative group">
                <select value={selectedSize?.name || ""} onChange={handleSizeChange} className="w-full appearance-none bg-white border border-gray-200 text-sm py-4 px-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--tender-cyan)/20 focus:border-(--tender-cyan) transition-all cursor-pointer font-medium text-(--tender-navy) shadow-sm hover:border-gray-300">
                  <option value="" disabled>Elige una opción...</option>
                  {product.sizes.map((size) => (
                    <option key={size.name} value={size.name}>{size.name} metros</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-(--tender-cyan)"><ChevronDown size={18} /></div>
              </div>
            </div>

            <div className="min-h-[100px] mb-8">
              {selectedSize && hangingSpace && (
                <div className="bg-gradient-to-r from-(--tender-gray-bg) to-transparent p-5 rounded-2xl border border-gray-100 flex items-center gap-5 animate-in fade-in zoom-in duration-300">
                  <div className="bg-white p-3 rounded-xl text-(--tender-cyan) shadow-sm border border-gray-50"><Ruler size={24} /></div>
                  <div className="flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.15em] text-(--tender-text-muted) font-bold mb-0.5">Espacio de colgado</p>
                    <p className="text-lg font-serif text-(--tender-navy)"><span className="font-bold">{hangingSpace}</span> <span className="text-sm">metros</span></p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => { if (!selectedSize) return; addItem({ id: `${product.sku}-${selectedSize.name}`, sku: product.sku, nombre: product.title, medida: selectedSize.name, precio: selectedSize.price, link_pago: selectedSize.link_pago }); setIsAdded(true); setTimeout(() => setIsAdded(false), 2000); }} disabled={!selectedSize} className={`group flex items-center justify-center gap-3 w-full py-5 rounded-xl font-black tracking-widest text-xs transition-all ${selectedSize ? isAdded ? 'bg-green-500 text-white' : 'bg-(--tender-navy) text-white hover:bg-(--tender-cyan) hover:shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                {isAdded ? <Check size={18} /> : <ShoppingCartIcon size={18} className="opacity-50" />}
                {isAdded ? 'AÑADIDO CON ÉXITO' : 'AÑADIR AL CARRITO'}
              </button>
              {isMounted && hasItemsInCart && <Link href="/carrito" className="flex items-center justify-center py-4 text-xs font-bold text-(--tender-navy) border-2 border-(--tender-navy) rounded-xl hover:bg-gray-50 transition-all uppercase tracking-widest">Finalizar Compra</Link>}
            </div>
          </div>
        </div>

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

        {/* --- DESCRIPCIÓN Y CARACTERÍSTICAS (Restaurado) --- */}
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

        {/* --- MAPA / ENVÍOS (Restaurado) --- */}
        <div className="mt-32 bg-(--tender-gray-bg) rounded-[3rem] p-8 md:p-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-(--tender-cyan) shadow-sm">
                <MapPin size={24} />
              </div>
              <h2 className="text-3xl font-serif text-(--tender-navy)">Zonas de Instalación y Envíos</h2>
              <p className="text-sm text-(--tender-text-dark) leading-relaxed">
                Contamos con una amplia red de cobertura para asegurar que tu Tender llegue y sea instalado por profesionales en tiempo récord.
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

<div className="mt-32 max-w-4xl mx-auto px-4">
  
{/* ENCABEZADO MINIMALISTA */}
<div className="mb-10 text-center">
  <h2 className="text-2xl md:text-3xl font-light text-gray-800 flex items-center justify-center gap-3">
    <Info size={24} className="text-gray-400" />
    Recomendaciones de Instalación
  </h2>
</div>

{/* CONTENEDOR DE RECOMENDACIONES */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* RECOMENDACIÓN 1 */}
  <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50/50">
    <p className="text-lg text-gray-600 leading-relaxed">
      Al medir el espacio disponible para elegir tu Tender, recordá dejar un margen mínimo de <strong className="text-gray-900 font-semibold">5 cm libres de cada lado</strong>.
    </p>
  </div>

  {/* RECOMENDACIÓN 2 */}
  <div className="p-8 border border-gray-200 rounded-2xl bg-gray-50/50">
    <p className="text-lg text-gray-600 leading-relaxed">
      Los modelos colgantes en techos de policarbonato, vidrio o espacios sin techo se pueden instalar, pero requieren <strong className="text-gray-900 font-semibold">presupuesto previo</strong>.
    </p>
  </div>

</div>
</div>

      </div>
    </main>
  );
}