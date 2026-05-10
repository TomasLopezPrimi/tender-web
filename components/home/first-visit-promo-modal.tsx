"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const STORAGE_KEY = "tender_promo_40off_seen";

export default function FirstVisitPromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = window.localStorage.getItem(STORAGE_KEY);

    if (hasSeenModal) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Cerrar modal de promocion"
        onClick={handleClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-3xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 z-10 rounded-full bg-white/90 p-2 text-gray-700 transition hover:bg-white"
          aria-label="Cerrar promocion"
        >
          <X size={18} />
        </button>

        <Image
          src="/images/banners/40_off_vertical.jpeg"
          alt="Promocion 40% OFF"
          width={900}
          height={1200}
          className="h-auto w-full object-contain md:hidden"
          priority
        />
        <Image
          src="/images/banners/40_off.jpeg"
          alt="Promocion 40% OFF"
          width={900}
          height={1200}
          className="hidden h-auto w-full object-contain md:block"
          priority
        />
      </div>
    </div>
  );
}