import { UIProduct } from "@/types/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"

export default function ProductCard({ product }: { product: UIProduct }) {

  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@graph": [
  //     {
  //       "@type": "Organization",
  //       "@id": "https://tender.com.ar/#organization",
  //       "name": "Tender®",
  //       "url": "https://tender.com.ar",
  //       "logo": "https://tender.com.ar/icon.png",
  //       "image": "https://tender.com.ar/icon.png",
  //       "description": "Fabricantes líderes de tenders de techo y soluciones de secado de ropa en Argentina.",
  //       "contactPoint": {
  //         "@type": "ContactPoint",
  //         "telephone": "+54-911-3187-6811",
  //         "contactType": "sales",
  //         "areaServed": "AR",
  //         "availableLanguage": "Spanish"
  //       }
  //     },
  //     {
  //       "@type": "Product",
  //       "@id": `https://tender.com.ar/producto/${product.sku}/#product`,
  //       "name": product.title,
  //       "image": product.images.map(img => `https://tender.com.ar${img}`),
  //       "description": product.description,
  //       "sku": product.sku,
  //       "mpn": product.sku,
  //       "brand": {
  //         "@type": "Brand",
  //         "name": "Tender®"
  //       },
  //       "offers": {
  //         "@type": "AggregateOffer",
  //         "url": `https://tender.com.ar/producto/${product.sku}`,
  //         "priceCurrency": "ARS",
  //         "lowPrice": Math.min(...product.sizes.map(s => s.price)),
  //         "highPrice": Math.max(...product.sizes.map(s => s.price)),
  //         "offerCount": product.sizes.length,
  //         "availability": "https://schema.org/InStock",
  //         "itemCondition": "https://schema.org/NewCondition",
  //         "priceValidUntil": "2026-12-31"
  //       },
  //       "mainEntityOfPage": {
  //         "@type": "WebPage",
  //         "@id": `https://tender.com.ar/producto/${product.sku}`
  //       }
  //     },

  //     {
  //       "@type": "BreadcrumbList",
  //       "itemListElement": [
  //         {
  //           "@type": "ListItem",
  //           "position": 1,
  //           "name": "Inicio",
  //           "item": "https://tender.com.ar"
  //         },
  //         {
  //           "@type": "ListItem",
  //           "position": 2,
  //           "name": product.categoryPath[0],
  //           "item": `https://tender.com.ar/categoria/${product.categoryPath[0].toLowerCase()}`
  //         },
  //         {
  //           "@type": "ListItem",
  //           "position": 3,
  //           "name": product.title,
  //           "item": `https://tender.com.ar/producto/${product.sku}`
  //         }
  //       ]
  //     }
  //   ]
  // };

  return (
    <>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}

      <Link
        href={`/producto/${product.sku}`}
        className="group flex flex-col h-full rounded-xl overflow-hidden bg-card hover:-translate-y-1.5 transition-all duration-500 max-w-sm mx-auto w-full shadow-sm hover:shadow-xl hover:shadow-[var(--tender-cyan)]/15 border border-border/60 hover:border-[var(--tender-cyan)]/30"
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
            <span
              className={`absolute top-3 left-3 flex items-center justify-center 
                        ${product.badgeColor === "bg-[var(--tender-cyan)]" ? "bg-[var(--tender-cyan)]/90 border-[var(--tender-cyan)]/30 text-white" : "bg-white/90 border-white/40 text-[var(--tender-navy)]"} 
                        backdrop-blur-md border border-white/20 text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider z-10 shadow-sm transition-transform duration-500 group-hover:scale-105`}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-grow justify-between">
          <div className="p-5 text-center">
            <h3 className="text-sm md:text-base font-bold text-[var(--tender-navy)] leading-snug mb-1.5 transition-colors group-hover:text-[var(--tender-cyan)]">
              {product.title}
            </h3>
            <p className="text-sm md:text-base text-[var(--tender-navy-mid)] font-medium">
              {product.priceRange}
            </p>
          </div>

          <div className="mt-auto px-5 py-4 border-t border-border/50 bg-slate-50/50 group-hover:bg-[var(--tender-cyan)]/[0.03] transition-colors duration-500">
            <span className="flex items-center justify-center gap-2 text-[var(--tender-navy)] text-xs font-bold uppercase tracking-wider group-hover:text-[var(--tender-cyan)] transition-colors duration-300">
              Ver detalles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </>
  )
}