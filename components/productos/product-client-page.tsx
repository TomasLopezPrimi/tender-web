// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Search, ShoppingCartIcon } from 'lucide-react';
// import { formatPrice } from "@/lib/products";
// import { useCartStore } from '@/hooks/use-cart-store';
// import { ProductSize, Product } from '@/types/products';

// interface ProductClientPageProps {
//     product: Product; 
//     sku: string;
//   }

// export default function ProductClientPage({ product, sku }: ProductClientPageProps) {
//   const addItem = useCartStore((state) => state.addItem);
//   const items = useCartStore((state) => state.items);

//   const [isAdded, setIsAdded] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const [activeImage, setActiveImage] = useState(product.images[0]);
//   const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

//   useEffect(() => {
//     setIsMounted(true);
//     setActiveImage(product.images[0]);
//     setSelectedSize(null);
//   }, [sku, product.images]);

//   const hasItemsInCart = items.length > 0;
//   const displayPrice = selectedSize ? formatPrice(selectedSize.price) : product.priceRange;

//   const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedName = e.target.value;
//     const sizeObj = product.sizes.find(size => size.name === selectedName);
//     setSelectedSize(sizeObj || null);
//   };

//   let hangingSpaceFormatted = null;
//   if (selectedSize) {
//     const threadsMatch = sku.match(/(\d+)h$/i);
//     const threads = threadsMatch ? parseInt(threadsMatch[1], 10) : 0;
//     const lengthStr = selectedSize.name.split('x')[0].trim().replace(',', '.');
//     const length = parseFloat(lengthStr);

//     if (threads > 0 && !isNaN(length)) {
//       const space = (threads + 1) * (length - 0.08);
//       hangingSpaceFormatted = space.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
//     }
//   }

//   const handleAddToCart = () => {
//     if (!selectedSize || !product) return;

//     const itemToAdd = {
//       id: `${product.sku}-${selectedSize.name}`, 
//       sku: product.sku,
//       nombre: product.title,
//       medida: selectedSize.name,
//       precio: selectedSize.price,
//     };

//     addItem(itemToAdd);
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000); 
//   };

//   return (
//     <div className="flex flex-col min-h-screen">

//       <main className="grow container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div className="flex flex-col gap-4">
//             <div className="relative aspect-4/3 w-full bg-(--tender-gray-bg) rounded-sm overflow-hidden border border-border group">
//               <Image 
//                 src={activeImage} 
//                 alt={product.title}
//                 fill
//                 className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
//                 sizes="(max-width: 768px) 100vw, 50vw"
//                 priority
//               />
//               <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-(--tender-navy) transition-colors">
//                 <Search size={20} />
//               </button>
//             </div>
//             <div className="grid grid-cols-5 gap-2 md:gap-4">
//               {product.images.map((img, index) => (
//                 <button 
//                   key={index}
//                   onClick={() => setActiveImage(img)}
//                   className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
//                     activeImage === img ? 'border-(--tender-cyan)' : 'border-transparent hover:border-gray-300'
//                   }`}
//                 >
//                   <Image src={img} alt={`Miniatura ${index + 1}`} fill className="object-cover" sizes="20vw" />
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col">
//             <nav className="flex items-center text-sm text-(--tender-text-muted) mb-6 flex-wrap gap-y-2">
//               {product.categoryPath.map((item, index) => (
//                 <div key={index} className="flex items-center">
//                   <span className="hover:text-(--tender-navy) cursor-pointer transition-colors">
//                     {item}
//                   </span>
//                   {index < product.categoryPath.length - 1 && <span className="mx-2">/</span>}
//                 </div>
//               ))}
//             </nav>

//             <div className="mb-4">
//               <Image src="/images/producto/garantia.png" alt="1 Año de Garantía Seal" width={64} height={64} />
//             </div>

//             <h1 className="text-3xl md:text-4xl font-bold text-(--tender-navy-mid) mb-4">
//               {product.title}
//             </h1>

//             <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>

//             <p className="text-(--tender-text-dark) leading-relaxed mb-8 text-sm md:text-base">
//                {product.description}
//             </p>

//             <div className="flex flex-col gap-2 mb-6">
//               <div className="flex flex-col md:flex-row md:items-center gap-4">
//                 <label htmlFor="size-select" className="font-bold text-(--tender-text-dark) min-w-35">
//                   Medida en metros:
//                 </label>
//                 <div className="relative grow max-w-xs">
//                   <select 
//                     id="size-select"
//                     value={selectedSize?.name || ""}
//                     onChange={handleSizeChange}
//                     className="w-full appearance-none bg-(--tender-gray-bg) border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-sm focus:outline-none focus:ring-1 focus:ring-(--tender-cyan) focus:border-(--tender-cyan) transition-colors cursor-pointer"
//                   >
//                     <option value="" disabled>Elige una opción</option>
//                     {product.sizes.map((size) => (
//                       <option key={size.name} value={size.name}>{size.name}</option>
//                     ))}
//                   </select>
//                   <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
//                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//                       <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               {selectedSize && (
//                 <div className="flex flex-col md:pl-39 w-full max-w-119">
//                   <div className="flex justify-end w-full max-w-xs mb-2">
//                     <button 
//                       onClick={() => setSelectedSize(null)}
//                       className="text-sm text-(--tender-cyan) hover:text-[#5bc0c0] transition-colors"
//                     >
//                       Limpiar
//                     </button>
//                   </div>

//                   {hangingSpaceFormatted && (
//                     <div className="text-(--tender-text-dark) mb-2 mt-2">
//                       Espacio de colgado: <span className="font-bold">{hangingSpaceFormatted} m</span>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="text-2xl font-bold text-(--tender-cyan) mb-4 transition-all duration-300">
//               {displayPrice} <span className="text-sm font-normal text-(--tender-cyan)">(precio final)</span>
//             </div>

//             <div className="flex flex-col gap-3 max-w-xs mt-2">
//               <button 
//                 onClick={handleAddToCart}
//                 className={`flex items-center justify-center gap-2 w-full py-3 px-6 font-bold text-white transition-all rounded-sm
//                   ${selectedSize 
//                     ? isAdded 
//                       ? 'bg-green-500 hover:bg-green-600' 
//                       : 'bg-(--tender-cyan) hover:bg-[#5bc0c0]' 
//                     : 'bg-gray-300 cursor-not-allowed'}
//                 `}
//                 disabled={!selectedSize}
//               >
//                 {isAdded ? '¡AÑADIDO AL CARRITO!' : 'AÑADIR AL CARRITO'}
//               </button>

//               {isMounted && hasItemsInCart && (
//                 <Link 
//                   href="/carrito"
//                   className="flex items-center justify-center gap-2 w-full py-3 px-6 font-bold text-(--tender-navy) bg-white border-2 border-(--tender-navy) hover:bg-gray-50 transition-all rounded-sm"
//                 >
//                   <ShoppingCartIcon size={18} />
//                   IR A PAGAR
//                 </Link>
//               )}
//             </div>

//             <div className="mt-8 text-sm text-(--tender-text-dark)">
//               <span className="font-medium">Código:</span> {product.code}
//             </div>
//           </div>
//         </div>

//         <div className="mt-20 border-t border-gray-200 pt-10">
//           <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
//             Descripción y Características
//           </h2>

//           <div className="bg-white">
//             <div className="relative aspect-video w-full mb-10 bg-(--tender-gray-bg)">
//               <iframe 
//                 src={product.videoUrl} 
//                 title={`Video demostrativo de ${product.title}`}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
//                 allowFullScreen
//                 className="absolute top-0 left-0 w-full h-full"
//               ></iframe>
//             </div>

//             <h3 className="text-[22px] font-bold text-[#333333] mb-5">
//               {product.description.split(':')[0]}
//             </h3>

//             <ul className="list-disc pl-5 space-y-2.5">
//               {product.features.map((feature, idx) => (
//                 <li key={idx} className="text-[#333333] text-[15px] leading-relaxed">
//                   <strong>{feature.title}:</strong> {feature.description}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="mt-16 border-t border-gray-200 pt-10">
//           <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
//             Zonas de Instalaciones y Envíos
//           </h2>

//           <div className="w-full max-w-5xl">
//             <Image 
//               src="/images/producto/instalaciones-envios.png"
//               alt="Mapa de zonas de envíos e instalaciones" 
//               width={1200}
//               height={700}
//               className="w-full h-auto border border-gray-200 shadow-sm rounded-sm" 
//               sizes="(max-width: 1024px) 100vw, 1200px"
//             />
//           </div>
//         </div>

//         <div className="mt-16 border-t border-gray-200 pt-10 mb-10">
//           <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
//             Recomendaciones de Instalación
//           </h2>
//           <div className="space-y-4 max-w-4xl">
//             <p className="text-[#333333] text-[15px] leading-relaxed">
//               Al tomar las medidas del espacio disponible para elegir el Tender, dejar como mínimo 5cm libres de cada lado.
//             </p>
//             <p className="text-[#333333] text-[15px] leading-relaxed">
//               Los modelos Colgantes que se instalen en techos de policarbonato, vidrio o incluso en lugares sin techo, se pueden realizar pero requieren previo presupuesto.
//             </p>
//           </div>
//         </div>
//       </main>

//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCartIcon, Check, Ruler, ChevronDown, MapPin, Info } from 'lucide-react';
import { formatPrice } from "@/lib/products";
import { useCartStore } from '@/hooks/use-cart-store';
import { ProductSize, Product } from '@/types/products';

export default function ProductClientPage({ product, sku }: { product: Product, sku: string }) {
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

        {/* --- CABECERA / BREADCRUMBS --- */}
        <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] text-(--tender-text-muted) mb-10 overflow-x-auto whitespace-nowrap pb-2">
          {product.categoryPath.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="hover:text-(--tender-cyan) cursor-pointer transition-colors">{item}</span>
              {index < product.categoryPath.length - 1 && <span className="mx-3 opacity-30">/</span>}
            </div>
          ))}
        </nav>

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
            <div className="text-2xl font-bold text-(--tender-cyan) tracking-tight mb-8">
              {displayPrice} <span className="text-xs font-normal ml-2 opacity-70 text-(--tender-navy)">IVA INCLUIDO</span>
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
                    <option key={size.name} value={size.name}>{size.name} metros — {formatPrice(size.price)}</option>
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
                    <p className="text-[10px] uppercase tracking-[0.15em] text-(--tender-text-muted) font-bold mb-0.5">Capacidad de Tendido</p>
                    <p className="text-lg font-serif text-(--tender-navy)"><span className="font-bold">{hangingSpace}</span> <span className="text-sm">metros lineales</span></p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button onClick={() => { if (!selectedSize) return; addItem({ id: `${product.sku}-${selectedSize.name}`, sku: product.sku, nombre: product.title, medida: selectedSize.name, precio: selectedSize.price }); setIsAdded(true); setTimeout(() => setIsAdded(false), 2000); }} disabled={!selectedSize} className={`group flex items-center justify-center gap-3 w-full py-5 rounded-xl font-black tracking-widest text-xs transition-all ${selectedSize ? isAdded ? 'bg-green-500 text-white' : 'bg-(--tender-navy) text-white hover:bg-(--tender-cyan) hover:shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
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

        {/* --- RECOMENDACIONES (Énfasis Premium) --- */}
        <div className="mt-32 max-w-5xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-(--tender-navy) text-white rounded-full mb-6">
              <Info size={16} className="text-(--tender-cyan)" />
              {/* <span className="text-[10px] font-black uppercase tracking-[0.3em]">Manual Técnico</span> */}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-(--tender-navy)">Recomendaciones de Instalación</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* RECOMENDACIÓN 1: El dato de medida */}
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-(--tender-cyan)/5 rounded-full -z-10 group-hover:scale-125 transition-transform duration-700" />
              <div className="h-full p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl shadow-gray-200/40 relative overflow-hidden">
                {/* Comilla decorativa */}
                <span className="absolute top-6 right-8 text-8xl font-serif text-(--tender-cyan)/10 leading-none">“</span>

                <p className="text-xl md:text-2xl font-serif text-(--tender-navy) leading-relaxed relative z-10">
                  "Al tomar las medidas del espacio disponible para elegir el Tender, dejar como mínimo
                  <span className="block mt-4 text-4xl md:text-5xl font-bold text-(--tender-cyan) tracking-tighter">
                    5cm libres
                  </span>
                  <span className="text-sm font-sans uppercase tracking-[0.2em] text-(--tender-text-muted) block mt-1">de cada lado</span>
                </p>
              </div>
            </div>

            {/* RECOMENDACIÓN 2: Casos especiales */}
            <div className="h-full p-10 bg-(--tender-navy) rounded-[2.5rem] shadow-xl flex flex-col justify-center relative overflow-hidden">
              {/* Patrón de fondo sutil */}
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(var(--tender-cyan) 1px, transparent 0)', backgroundSize: '20px 20px' }} />

              <div className="relative z-10">
                <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed">
                  Los modelos <span className="text-(--tender-cyan) font-bold">Colgantes</span> en techos de policarbonato, vidrio o lugares sin techo,
                  se pueden realizar pero requieren
                </p>
                <div className="mt-8 inline-block px-6 py-3 border-2 border-(--tender-cyan) text-(--tender-cyan) rounded-xl font-black uppercase tracking-widest text-sm">
                  Presupuesto Previo
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}