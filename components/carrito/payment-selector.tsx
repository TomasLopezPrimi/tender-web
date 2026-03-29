"use client";

import { CreditCard, Landmark } from "lucide-react";

interface PaymentSelectorProps {
  selectedMethod: string;
  onSelectMethod: (method: string) => void;
}

export default function PaymentSelector({ 
  selectedMethod, 
  onSelectMethod 
}: PaymentSelectorProps) {
  
  const paymentMethods = [
    {
      id: "transferencia",
      title: "Transferencia Bancaria",
      description: "Pago manual con 15% de descuento.",
      icon: Landmark,
    },
    // {
    //   id: "getnet",
    //   title: "Tarjetas de Crédito / Débito",
    //   description: "Pago seguro a través de Getnet.",
    //   icon: CreditCard,
    // }
  ];

  return (
    <div className="bg-white rounded-sm p-6 shadow-sm border border-gray-100 animate-fade-in-up">
      <h2 className="text-lg font-bold text-[var(--tender-navy-mid)] mb-6 border-b pb-4">
        Método de pago
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <label 
              key={method.id}
              className={`
                relative flex flex-col p-4 cursor-pointer rounded-md border-2 transition-all duration-200
                ${isSelected 
                  ? 'border-[var(--tender-cyan)] bg-[var(--tender-cyan)]/5' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
                }
              `}
              onClick={() => onSelectMethod(method.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon 
                    size={24} 
                    className={isSelected ? 'text-[var(--tender-cyan)]' : 'text-gray-400'} 
                  />
                  <span className={`font-semibold ${isSelected ? 'text-[var(--tender-navy-mid)]' : 'text-[var(--tender-text-dark)]'}`}>
                    {method.title}
                  </span>
                </div>
                
                {/* Custom Radio Button */}
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isSelected ? 'border-[var(--tender-cyan)]' : 'border-gray-300'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--tender-cyan)]" />}
                </div>
              </div>
              
              <p className="text-sm text-[var(--tender-text-muted)] ml-9">
                {method.description}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}