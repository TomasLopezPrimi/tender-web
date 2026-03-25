'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ShoppingCartIcon } from 'lucide-react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import { formatPrice, ProductSize, Product } from "@/lib/products";
import { useCartStore } from '@/hooks/use-cart-store';

interface ProductClientPageProps {
    product: Product; 
    sku: string;
  }

export default function ProductClientPage({ product, sku }: ProductClientPageProps) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);
  
  const [isAdded, setIsAdded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setActiveImage(product.images[0]);
    setSelectedSize(null);
  }, [sku, product.images]);

  const hasItemsInCart = items.length > 0;
  const displayPrice = selectedSize ? formatPrice(selectedSize.price) : product.priceRange;

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const sizeObj = product.sizes.find(size => size.name === selectedName);
    setSelectedSize(sizeObj || null);
  };

  let hangingSpaceFormatted = null;
  if (selectedSize) {
    const threadsMatch = sku.match(/(\d+)h$/i);
    const threads = threadsMatch ? parseInt(threadsMatch[1], 10) : 0;
    const lengthStr = selectedSize.name.split('x')[0].trim().replace(',', '.');
    const length = parseFloat(lengthStr);
    
    if (threads > 0 && !isNaN(length)) {
      const space = (threads + 1) * (length - 0.08);
      hangingSpaceFormatted = space.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;
    
    const itemToAdd = {
      id: `${product.sku}-${selectedSize.name}`, 
      sku: product.sku,
      nombre: product.title,
      medida: selectedSize.name,
      precio: selectedSize.price,
    };
    
    addItem(itemToAdd);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="grow container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 w-full bg-(--tender-gray-bg) rounded-sm overflow-hidden border border-border group">
              <Image 
                src={activeImage} 
                alt={product.title}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-(--tender-navy) transition-colors">
                <Search size={20} />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square overflow-hidden rounded-sm border-2 transition-all ${
                    activeImage === img ? 'border-(--tender-cyan)' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`Miniatura ${index + 1}`} fill className="object-cover" sizes="20vw" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <nav className="flex items-center text-sm text-(--tender-text-muted) mb-6 flex-wrap gap-y-2">
              {product.categoryPath.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="hover:text-(--tender-navy) cursor-pointer transition-colors">
                    {item}
                  </span>
                  {index < product.categoryPath.length - 1 && <span className="mx-2">/</span>}
                </div>
              ))}
            </nav>

            <div className="mb-4">
              <Image src="/images/producto/garantia.png" alt="1 Año de Garantía Seal" width={64} height={64} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-(--tender-navy-mid) mb-4">
              {product.title}
            </h1>
            
            <div className="w-12 h-0.5 bg-gray-200 mb-6"></div>

            <p className="text-(--tender-text-dark) leading-relaxed mb-8 text-sm md:text-base">
               {product.description}
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <label htmlFor="size-select" className="font-bold text-(--tender-text-dark) min-w-35">
                  Medida en metros:
                </label>
                <div className="relative grow max-w-xs">
                  <select 
                    id="size-select"
                    value={selectedSize?.name || ""}
                    onChange={handleSizeChange}
                    className="w-full appearance-none bg-(--tender-gray-bg) border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-sm focus:outline-none focus:ring-1 focus:ring-(--tender-cyan) focus:border-(--tender-cyan) transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Elige una opción</option>
                    {product.sizes.map((size) => (
                      <option key={size.name} value={size.name}>{size.name}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {selectedSize && (
                <div className="flex flex-col md:pl-39 w-full max-w-119">
                  <div className="flex justify-end w-full max-w-xs mb-2">
                    <button 
                      onClick={() => setSelectedSize(null)}
                      className="text-sm text-(--tender-cyan) hover:text-[#5bc0c0] transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                  
                  {hangingSpaceFormatted && (
                    <div className="text-(--tender-text-dark) mb-2 mt-2">
                      Espacio de colgado: <span className="font-bold">{hangingSpaceFormatted} m</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-2xl font-bold text-(--tender-cyan) mb-4 transition-all duration-300">
              {displayPrice} <span className="text-sm font-normal text-(--tender-cyan)">(precio final)</span>
            </div>

            <div className="flex flex-col gap-3 max-w-xs mt-2">
              <button 
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 w-full py-3 px-6 font-bold text-white transition-all rounded-sm
                  ${selectedSize 
                    ? isAdded 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : 'bg-(--tender-cyan) hover:bg-[#5bc0c0]' 
                    : 'bg-gray-300 cursor-not-allowed'}
                `}
                disabled={!selectedSize}
              >
                {isAdded ? '¡AÑADIDO AL CARRITO!' : 'AÑADIR AL CARRITO'}
              </button>

              {isMounted && hasItemsInCart && (
                <Link 
                  href="/carrito"
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 font-bold text-(--tender-navy) bg-white border-2 border-(--tender-navy) hover:bg-gray-50 transition-all rounded-sm"
                >
                  <ShoppingCartIcon size={18} />
                  IR A PAGAR
                </Link>
              )}
            </div>

            <div className="mt-8 text-sm text-(--tender-text-dark)">
              <span className="font-medium">Código:</span> {product.code}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
            Descripción y Características
          </h2>

          <div className="bg-white">
            <div className="relative aspect-video w-full mb-10 bg-(--tender-gray-bg)">
              <iframe 
                src={product.videoUrl} 
                title={`Video demostrativo de ${product.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>

            <h3 className="text-[22px] font-bold text-[#333333] mb-5">
              {product.description.split(':')[0]}
            </h3>

            <ul className="list-disc pl-5 space-y-2.5">
              {product.features.map((feature, idx) => (
                <li key={idx} className="text-[#333333] text-[15px] leading-relaxed">
                  <strong>{feature.title}:</strong> {feature.description}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
            Zonas de Instalaciones y Envíos
          </h2>
          
          <div className="w-full max-w-5xl">
            <Image 
              src="/images/producto/instalaciones-envios.png"
              alt="Mapa de zonas de envíos e instalaciones" 
              width={1200}
              height={700}
              className="w-full h-auto border border-gray-200 shadow-sm rounded-sm" 
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-10 mb-10">
          <h2 className="text-2xl font-bold text-(--tender-navy-mid) mb-8">
            Recomendaciones de Instalación
          </h2>
          <div className="space-y-4 max-w-4xl">
            <p className="text-[#333333] text-[15px] leading-relaxed">
              Al tomar las medidas del espacio disponible para elegir el Tender, dejar como mínimo 5cm libres de cada lado.
            </p>
            <p className="text-[#333333] text-[15px] leading-relaxed">
              Los modelos Colgantes que se instalen en techos de policarbonato, vidrio o incluso en lugares sin techo, se pueden realizar pero requieren previo presupuesto.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}