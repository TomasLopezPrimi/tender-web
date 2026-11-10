"use client";

import { useState } from "react";
import { getTransferReceipt, uploadTransferReceipt } from "@/actions/cart";

export function useTransferReceipt(orderId: number, guestToken?: string | null) {
  const [uploaded, setUploaded] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function check() {
    setBusy(true);
    const result = await getTransferReceipt(orderId, guestToken ?? undefined);
    setBusy(false);
    if (result.ok) setUploaded(result.data.uploaded);
    else setMessage(result.error);
  }

  async function submit(file: File) {
    setBusy(true);
    setMessage("");
    const result = await uploadTransferReceipt(orderId, file, guestToken ?? undefined);
    setBusy(false);
    if (result.ok) {
      setUploaded(true);
      setMessage("Recibimos tu comprobante. La transferencia se verificará antes de confirmar el pago");
    } else setMessage(result.error);
  }

  return { uploaded, busy, message, check, submit };
}
