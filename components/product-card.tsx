import { UIProduct } from "@/types/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"

export default function ProductCard({ product }: { product: UIProduct }) {

    // const formatPrice = (price: number) => {
    //   return new Intl.NumberFormat('es-AR', {
    //     style: 'currency',
    //     currency: 'ARS',
    //     // Si es un número entero (ej: 100000), no muestra decimales. 
    //     // Si tiene centavos (ej: 100000.86), muestra 2.
    //     minimumFractionDigits: Number.isInteger(price) ? 0 : 2, 
    //     maximumFractionDigits: 2
    //   }).format(price);
    // };
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://tender.com.ar/#organization",
            "name": "Tender®",
            "url": "https://tender.com.ar",
            "logo": "https://tender.com.ar/icon.png", 
            "image": "https://tender.com.ar/icon.png",
            "description": "Fabricantes líderes de tenders de techo y soluciones de secado de ropa en Argentina.",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+54-911-3187-6811", 
              "contactType": "sales",
              "areaServed": "AR",
              "availableLanguage": "Spanish"
            }
          },
          {
            "@type": "Product",
            "@id": `https://tender.com.ar/producto/${product.sku}/#product`,
            "name": product.title,
            "image": product.images.map(img => `https://tender.com.ar${img}`),
            "description": product.description,
            "sku": product.sku,
            "mpn": product.sku,
            "brand": {
              "@type": "Brand",
              "name": "Tender®"
            },
            "offers": {
              "@type": "AggregateOffer",
              "url": `https://tender.com.ar/producto/${product.sku}`,
              "priceCurrency": "ARS",
              "lowPrice": Math.min(...product.sizes.map(s => s.price)),
              "highPrice": Math.max(...product.sizes.map(s => s.price)),
              "offerCount": product.sizes.length,
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "priceValidUntil": "2026-12-31" 
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://tender.com.ar/producto/${product.sku}`
            }
          },
          
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://tender.com.ar"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": product.categoryPath[0],
                "item": `https://tender.com.ar/categoria/${product.categoryPath[0].toLowerCase()}`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": product.title,
                "item": `https://tender.com.ar/producto/${product.sku}`
              }
            ]
          }
        ]
      };
  
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        
            <Link
                href={`/producto/${product.sku}`}
                className="group flex flex-col h-full rounded-xl overflow-hidden shadow-sm border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm mx-auto w-full"
            >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--tender-gray-bg)]">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.badge && (
                    <span className={`absolute top-3 left-3 ${product.badgeColor || "bg-[var(--tender-cyan)]"} text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide z-10 shadow-sm`}>
                    {product.badge}
                    </span>
                )}
                </div>
        
                {/* Padding reducido (p-4) y textos más compactos */}
                <div className="p-4 text-center flex flex-col flex-grow justify-between">
                <div>
                    <h3 className="text-sm md:text-base font-bold text-[var(--tender-navy)] leading-snug mb-1">
                    {product.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[var(--tender-cyan)] font-semibold">
                    {product.priceRange}
                    </p>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center justify-center gap-1.5 text-[var(--tender-navy-mid)] text-xs font-semibold group-hover:text-[var(--tender-cyan)] transition-colors duration-300">
                    Ver detalles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
                </div>
            </Link>
        </>
    )
  }