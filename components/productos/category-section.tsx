import { Product, ProductFeature } from "@/types/products";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InstallationsAndShipping from "../instalacion";
import FeatureImage from "./feature-image";

interface CategorySectionProps {
  type: "Colgante" | "Rebatible";
  title: string;
  subtitle: string;
  heroImage: string;
  videoUrl: string;
  features: ProductFeature[];
  productsData: Product[];
  bgColor: string;
}

export default function CategorySection({ type, title, subtitle, heroImage, videoUrl, features, productsData, bgColor }: CategorySectionProps) {
  return (
    // Aplicamos relative y z-0 a la sección general para que la sombra del hero caiga sobre ella
    <section className={`${bgColor} relative z-0`}>
      
      {/* 1. Contenedor Hero: Le agregamos el borde, la sombra y un z-10 */}
      <div className="relative flex h-[40vh] min-h-[400px] w-full items-center justify-center bg-[var(--tender-navy)] border-b-4 border-[var(--tender-gold)] shadow-xl shadow-black/20 z-10">
        
        {/* Envolvemos la imagen en este div con overflow-hidden para que NO corte la sombra del contenedor padre */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={heroImage}
            alt={`Hero Tender ${type}`}
            fill
            className="object-cover object-center opacity-50"
            priority={type === "Colgante"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--tender-navy)]/90 via-[var(--tender-navy)]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center px-4 text-center animate-fade-in-up">
          {/* Corregí text-(--tender-cyan) a la sintaxis correcta text-[var(--tender-cyan)] */}
          <h2 className="text-sm font-bold tracking-[0.2em] text-[var(--tender-cyan)] uppercase mb-4">
            Tender {type}
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white">
            {title}
          </p>
          <div className="gold-line mt-6 mb-6" />
          <p className="max-w-2xl text-lg text-white/90 md:text-xl">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center">
        <div className="w-full max-w-5xl mb-24 overflow-hidden rounded-2xl shadow-2xl border border-border/50 bg-black">
          <div className="relative aspect-video w-full">
            <iframe
              src={videoUrl}
              title={`Video Tender ${type}`}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-24">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col group text-center md:text-left">
              <FeatureImage 
                src={`/images/producto/${idx + 1}.jpg`} 
                alt={feature.title} 
              />
              <h4 className="font-bold text-xl mb-3 text-[var(--tender-navy)] dark:text-foreground">
                {feature.title}
              </h4>
              <p className="text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl bg-card rounded-2xl p-6 md:p-10 shadow-lg border border-border/50">
          <div className="text-center mb-10">
            <div className="text-2xl md:text-3xl font-bold text-[var(--tender-navy)] dark:text-foreground mb-4">
              Modelos Disponibles
            </div>
            <div className="gold-line mb-4 mx-auto" />
            <p className="text-muted-foreground">
              Seleccioná el modelo para ver todas sus medidas, especificaciones y valores.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            {productsData.map((product) => (
              <Link 
                key={product.sku} 
                href={`/producto/${product.sku}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 md:p-6 bg-background rounded-xl border border-border shadow-sm transition-all duration-300 hover:border-[var(--tender-cyan)] hover:shadow-md"
              >
                <div className="flex flex-col text-left mb-4 sm:mb-0 pr-4">
                  <h3 className="font-bold text-lg md:text-xl text-[var(--tender-navy)] dark:text-foreground mb-1 group-hover:text-[var(--tender-cyan)] transition-colors">
                    {product.title}
                  </h3>
                  <span className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1 mb-2">
                    {product.description}
                  </span>
                  <span className="text-sm md:text-base font-medium text-[var(--tender-cyan)]">
                    Desde {product.priceRange.split(' - ')[0]}
                  </span>
                </div>
                
                <div className="flex shrink-0 items-center justify-center px-5 py-2.5 rounded-full bg-muted/30 border border-border text-sm font-semibold text-[var(--tender-navy)] dark:text-foreground transition-all duration-300 group-hover:bg-[var(--tender-navy)] group-hover:text-white group-hover:border-transparent">
                  Ver medidas <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      <InstallationsAndShipping />
    </section>
  );
}