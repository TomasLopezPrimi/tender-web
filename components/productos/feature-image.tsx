"use client";

import { useState } from "react";
import Image from "next/image";

interface FeatureImageProps {
  src: string;
  alt: string;
}

export default function FeatureImage({ src, alt }: FeatureImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative aspect-[16/9] mb-6 overflow-hidden rounded-xl bg-muted/50 shadow-sm border border-border flex items-center justify-center">
      
      <span className="absolute px-4 text-sm font-medium text-muted-foreground text-center">
        Imagen: {alt}
      </span>

      {!hasError && (
        <Image 
          src={src} 
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="relative z-10 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)} // Si falla, ocultamos el Image de Next.js
        />
      )}
    </div>
  );
}