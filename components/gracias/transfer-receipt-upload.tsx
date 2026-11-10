"use client";

import { useEffect, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { useTransferReceipt } from "@/hooks/use-transfer-receipt";
import { readTransferReceiptToken } from "@/lib/thank-you-context";

export function TransferReceiptUpload({ orderId, account = false }: { orderId: number; account?: boolean }) {
  const [token, setToken] = useState<string | null>(account ? null : "pending");
  const [validationError, setValidationError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!account) setToken(readTransferReceiptToken(String(orderId)));
  }, [account, orderId]);
  const receipt = useTransferReceipt(orderId, account ? undefined : token === "pending" ? null : token);
  useEffect(() => {
    if (token !== "pending") void receipt.check();
    // Only initialize once credentials are resolved.
  }, [token, account, orderId]);

  const selectFile = (file?: File) => {
    if (!file) return;
    if (!file.size || file.size > 5 * 1024 * 1024 || !["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      setValidationError("El archivo debe ser PDF, JPG o PNG y no superar 5 MiB.");
      return;
    }
    setValidationError("");
    void receipt.submit(file);
    if (input.current) input.current.value = "";
  };

  if (!account && token === "pending") return <p className="text-sm text-slate-500">Preparando carga del comprobante…</p>;
  if (!account && !token) return <p className="text-sm text-amber-800">El acceso para adjuntar el comprobante venció o no está disponible. Podés enviarlo por WhatsApp.</p>;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      {receipt.uploaded ? (
        <p role="status" className="text-sm font-semibold text-emerald-800">Recibimos tu comprobante. La transferencia se verificará antes de confirmar el pago</p>
      ) : (
        <>
          <input ref={input} type="file" accept="application/pdf,image/jpeg,image/png" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
          <button type="button" disabled={receipt.busy} onClick={() => input.current?.click()} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[var(--tender-navy)] px-4 py-3 font-semibold text-white hover:bg-[var(--tender-navy-mid)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tender-cyan)] disabled:opacity-60">
            <Upload size={18} /> {receipt.busy ? "Enviando…" : "Adjuntar comprobante"}
          </button>
          <p className="mt-2 text-center text-xs text-slate-500">Un archivo PDF, JPG o PNG · Máximo 5 MiB</p>
        </>
      )}
      {validationError ? <p role="alert" className="mt-3 text-sm text-red-700">{validationError}</p> : null}
      {receipt.message && !receipt.uploaded ? <p role="alert" className="mt-3 text-sm text-red-700">{receipt.message}</p> : null}
    </div>
  );
}
