"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PagoResultadoContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // "success" | "failed"

  useEffect(() => {
    if (status && window.parent !== window) {
      window.parent.postMessage(
        { type: "getnet-payment-result", status },
        window.location.origin
      );
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center p-8">
        {status === "success" ? (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-2">Pago aprobado</h1>
            <p className="text-gray-500">Procesando tu pedido...</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">Pago rechazado</h1>
            <p className="text-gray-500">Podés intentar nuevamente.</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PagoResultadoPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Cargando...</p></div>}>
      <PagoResultadoContent />
    </Suspense>
  );
}
