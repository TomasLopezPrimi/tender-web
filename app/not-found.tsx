'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-(--tender-navy) mb-2">
          Redirigiendo...
        </h2>
        <p className="text-gray-500">Estamos llevándote al sitio oficial de Tender®</p>
      </div>
    </div>
  );
}