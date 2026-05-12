"use client";

import { useEffect } from "react";

interface GetnetCheckoutProps {
  isOpen: boolean;
  paymentIntentId: string;
}

const LOADER_SRC =
  process.env.NEXT_PUBLIC_GETNET_LOADER_URL ||
  "https://www.pre.globalgetnet.com/digital-checkout/loader.js";

const SCRIPT_ID = "getnet-digital-checkout-loader";

type GetnetLoader = {
  init: (cfg: { paymentIntentId: string; checkoutType: "lightbox" | "iframe" }) => void;
};

export default function GetnetCheckout({ isOpen, paymentIntentId }: GetnetCheckoutProps) {
  useEffect(() => {
    if (!isOpen || !paymentIntentId) return;

    const launch = () => {
      const w = window as unknown as { loader?: GetnetLoader };
      if (!w.loader) {
        console.error("[Getnet] loader.js no expuso window.loader");
        return;
      }
      w.loader.init({ paymentIntentId, checkoutType: "lightbox" });
    };

    const w = window as unknown as { loader?: GetnetLoader };
    if (w.loader) {
      launch();
      return;
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", launch, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = LOADER_SRC;
    script.async = true;
    script.setAttribute("data-testid", "digital-checkout");
    script.onload = launch;
    script.onerror = () => console.error("[Getnet] falló la carga de loader.js");
    document.body.appendChild(script);
  }, [isOpen, paymentIntentId]);

  return null;
}
