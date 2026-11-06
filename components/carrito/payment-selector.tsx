"use client";

import { useState } from "react";
import { CreditCard, Landmark, Copy, Check } from "lucide-react";
import type { BankDetails } from "@/config";
import { PricingConfig, CartItem } from "@/types/products";
import { getPaymentDiscountRate } from "@/lib/pricing";

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
  pricingConfig: PricingConfig;
  cartItems: CartItem[];
  bankDetails: BankDetails;
}

export default function PaymentSelector({
  selectedMethod,
  onSelectMethod,
  pricingConfig,
  cartItems,
  bankDetails,
}: PaymentSelectorProps) {

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const transferPct = Math.round(getPaymentDiscountRate(pricingConfig, "TRANSFERENCIA") * 100);

  // GETNET-LINK reemplazado por GETNET-WEB. Se conserva comentado por si vuelve.
  // const allItemsHaveLink = cartItems.length > 0 && cartItems.every((item) => !!item.link_pago);
  void cartItems;

  const paymentMethods = [
    {
      id: "transferencia",
      title: "Transferencia Bancaria",
      description: transferPct > 0
        ? `¡Aprovechá el ${transferPct}% de descuento!`
        : "",
      icon: Landmark,
      disabled: false,
    },
    // {
    //   id: "getnet-link",
    //   title: "Tarjeta de crédito o débito",
    //   description: allItemsHaveLink
    //     ? "Acepta débito y hasta 18 cuotas con tarjeta de crédito."
    //     : "No disponible para los productos seleccionados.",
    //   icon: CreditCard,
    //   disabled: !allItemsHaveLink,
    // },
    {
      id: "getnet",
      title: "Tarjeta de crédito o débito",
      description: "Pagá con débito o crédito en hasta 18 cuotas. Procesado por Getnet.",
      icon: CreditCard,
      disabled: false,
    },
  ];

  const handleSelect = (method: string, disabled: boolean) => {
    if (disabled) return;
    onSelectMethod(method);
  };

  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 animate-fade-in-up">
      <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">
        <span className="text-[var(--tender-cyan)] mr-1.5">②</span>Método de pago
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          const isDisabled = method.disabled;

          return (
            <label
              key={method.id}
              className={`
                relative flex flex-col p-4 rounded-md border-2 transition-all duration-200
                ${isDisabled
                  ? 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                  : isSelected
                    ? 'border-[var(--tender-cyan)] bg-[var(--tender-cyan)]/5 cursor-pointer'
                    : 'border-gray-200 hover:border-gray-300 bg-white cursor-pointer'
                }
              `}
              onClick={() => handleSelect(method.id, isDisabled)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon
                    size={24}
                    className={isSelected && !isDisabled ? 'text-[var(--tender-cyan)]' : 'text-gray-400'}
                  />
                  <span className={`font-semibold ${isSelected && !isDisabled ? 'text-[var(--tender-navy-mid)]' : 'text-[var(--tender-text-dark)]'}`}>
                    {method.title}
                  </span>
                </div>

                {/* Custom Radio Button */}
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected && !isDisabled ? 'border-[var(--tender-cyan)]' : 'border-gray-300'}
                `}>
                  {isSelected && !isDisabled && <div className="w-2.5 h-2.5 rounded-full bg-[var(--tender-cyan)]" />}
                </div>
              </div>

              <p className="text-sm text-[var(--tender-text-muted)] ml-9">
                {method.description}
              </p>
            </label>
          );
        })}
      </div>

      {/* DATOS BANCARIOS - Solo cuando transferencia está seleccionada */}
      {selectedMethod === "transferencia" && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-sm p-4 animate-fade-in">
          <div className="space-y-3">
            {/* Alias */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase text-gray-500 font-semibold ml-1">Alias</span>
              <div
                onClick={() => copyToClipboard(bankDetails.alias, 'alias')}
                className="flex justify-between items-center bg-white border border-gray-200 p-2.5 rounded-sm cursor-pointer hover:border-[var(--tender-cyan)] transition-colors group"
              >
                <code className="text-xs font-mono font-bold text-gray-700">{bankDetails.alias}</code>
                {copiedField === 'alias' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400 group-hover:text-[var(--tender-cyan)]" />}
              </div>
            </div>

            {/* CBU */}
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase text-gray-500 font-semibold ml-1">CBU</span>
              <div
                onClick={() => copyToClipboard(bankDetails.cbu, 'cbu')}
                className="flex justify-between items-center bg-white border border-gray-200 p-2.5 rounded-sm cursor-pointer hover:border-[var(--tender-cyan)] transition-colors group"
              >
                <code className="text-xs font-mono font-bold text-gray-700">{bankDetails.cbu}</code>
                {copiedField === 'cbu' ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-400 group-hover:text-[var(--tender-cyan)]" />}
              </div>
            </div>

            <div className="pt-1">
              <p className="text-[11px] text-gray-600"><strong>Titular:</strong> {bankDetails.titular}</p>
            </div>
          </div>
        </div>
      )}

      {/* INFO CUOTAS - Solo cuando Getnet Web Checkout está seleccionado */}
      {selectedMethod === "getnet" && (
        <div className="mt-4 animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-sm p-4">
            <div className="flex items-start gap-3">
              <CreditCard size={20} className="text-blue-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-blue-900 mb-1">
                  Hasta <span className="text-lg font-black text-blue-700">18 cuotas</span> con tarjeta de crédito
                </p>
                <p className="text-xs text-blue-700">
                  También acepta débito. El interés de las cuotas varía según el banco.
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  Al confirmar se abrirá una ventana segura de Getnet para procesar tu pago.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
