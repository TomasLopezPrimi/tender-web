"use client";

import { useEffect, useRef, useState } from "react";
import { X, CreditCard, ExternalLink, Check, AlertCircle } from "lucide-react";
import { GetnetLinkItem } from "@/types/checkout";
import { PricingConfig } from "@/types/products";
import { applyGlobalDiscount, getGlobalDiscountRate } from "@/lib/pricing";

interface PaymentLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllLinksOpened: () => void;
  links: GetnetLinkItem[];
  orderId?: number;
  pricingConfig: PricingConfig;
}

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export default function PaymentLinksModal({
  isOpen,
  onClose,
  onAllLinksOpened,
  links,
  orderId,
  pricingConfig,
}: PaymentLinksModalProps) {
  const [openedLinks, setOpenedLinks] = useState<Set<number>>(new Set());
  const hasNotifiedCompletion = useRef(false);
  const globalDiscountRate = getGlobalDiscountRate(pricingConfig);
  const hasGlobalDiscount = globalDiscountRate > 0;
  const globalDiscountPct = Math.round(globalDiscountRate * 100);

  useEffect(() => {
    if (!isOpen) return;

    setOpenedLinks(new Set());
    hasNotifiedCompletion.current = false;
  }, [isOpen, links]);

  const allOpened = links.length > 0 && openedLinks.size === links.length;

  useEffect(() => {
    if (!isOpen || !allOpened || hasNotifiedCompletion.current) return;

    hasNotifiedCompletion.current = true;
    onAllLinksOpened();
  }, [allOpened, isOpen, onAllLinksOpened]);

  if (!isOpen) return null;

  const handleOpenLink = (index: number, url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpenedLinks((prev) => {
      if (prev.has(index)) return prev;

      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <CreditCard size={22} className="text-[var(--tender-cyan)]" />
            <div>
              <h2 className="text-base font-bold text-[var(--tender-navy-mid)]">Links de pago</h2>
              {orderId && (
                <p className="text-xs text-gray-400">Orden #{orderId}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Info banner */}
        <div className="mx-6 mt-5 bg-amber-50 border border-amber-200 rounded-sm p-3 flex gap-2.5">
          <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-800 leading-relaxed space-y-1">
            <p>
              Tu compra está registrada y <strong>pendiente de pago</strong>. Completá cada link para finalizar. Podés pagar con débito o hasta 18 cuotas con tarjeta de crédito.
            </p>
            <p>
              Una vez acreditado el pago, te vamos a contactar para coordinar la entrega.
            </p>
            <p>
              Si deseás colocación incluida, contactate con nosotros.
            </p>
          </div>
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {links.map((link, index) => {
            const isOpened = openedLinks.has(index);
            return (
              <div
                key={index}
                className={`flex items-center justify-between gap-4 p-4 rounded-sm border transition-all ${
                  isOpened
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[var(--tender-navy-mid)] truncate">
                    {link.label}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {hasGlobalDiscount && (
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(link.amount)}
                      </span>
                    )}
                    <span className="text-xs font-semibold text-gray-700">
                      {formatPrice(applyGlobalDiscount(link.amount, pricingConfig))}
                    </span>
                    {hasGlobalDiscount && (
                      <span className="text-[10px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        {globalDiscountPct}% OFF
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleOpenLink(index, link.url)}
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-sm transition-all whitespace-nowrap ${
                    isOpened
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-[var(--tender-navy)] text-white hover:bg-[var(--tender-navy-mid)]"
                  }`}
                >
                  {isOpened ? (
                    <>
                      <Check size={13} />
                      Abierto
                    </>
                  ) : (
                    <>
                      <ExternalLink size={13} />
                      Pagar
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          {allOpened ? (
            <div className="text-center text-xs text-green-700 font-semibold mb-3 space-y-1">
              <p>✓ Abriste todos los links. Completá el pago en cada pestaña.</p>
              <p>Después te vamos a contactar para coordinar la entrega.</p>
            </div>
          ) : (
            <p className="text-center text-xs text-gray-500 mb-3">
              {openedLinks.size} de {links.length} link{links.length !== 1 ? "s" : ""} abierto{links.length !== 1 ? "s" : ""}
            </p>
          )}
          <button
            onClick={onClose}
            className="w-full py-3 text-sm font-bold text-gray-600 border border-gray-200 rounded-sm hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
