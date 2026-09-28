'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  // Resetear la imagen activa al navegar a otro producto (cambia el array).
  useEffect(() => {
    setActiveImage(images[0]);
  }, [images]);

  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      <div className="relative aspect-[4/3] w-full bg-(--tender-gray-bg) rounded-xl overflow-hidden border border-gray-100 group cursor-zoom-in">
        <Image src={activeImage} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-sm text-(--tender-navy)">
          <Search size={20} />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3">
        {images.map((img, index) => (
          <button key={index} onClick={() => setActiveImage(img)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-(--tender-cyan) scale-95' : 'border-transparent opacity-60 hover:opacity-100'}`}
          >
            <Image src={img} alt="Thumbnail" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
