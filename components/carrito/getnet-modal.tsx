"use client";

import { useEffect } from "react";

interface GetnetCheckoutProps {
  isOpen: boolean;
  paymentIntentId: string;
}

const LOADER_SRC =
  process.env.NEXT_PUBLIC_GETNET_LOADER_URL ||
  "https://www.globalgetnet.com/digital-checkout/loader.js";

const SCRIPT_ID = "getnet-digital-checkout-loader";
const LIGHTBOX_MARKER_CLASS = "tender-getnet-lightbox-fixed";

type GetnetLoader = {
  init: (cfg: { paymentIntentId: string; checkoutType: "lightbox" | "iframe" }) => void;
};

const looksLikeGetnetNode = (el: Element): boolean => {
  if (el.tagName === "IFRAME") {
    const src = (el as HTMLIFrameElement).src || "";
    if (src.includes("globalgetnet") || src.includes("getnet")) return true;
  }
  const id = el.id?.toLowerCase() ?? "";
  if (id.includes("getnet") || id === "digitalcheckout") return true;
  const cls = (el.getAttribute("class") || "").toLowerCase();
  if (cls.includes("getnet") || cls.includes("digital-checkout")) return true;
  return false;
};

const forceFixed = (el: HTMLElement) => {
  el.classList.add(LIGHTBOX_MARKER_CLASS);
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.right = "0";
  el.style.bottom = "0";
  el.style.width = "100vw";
  el.style.height = "100vh";
  el.style.zIndex = "2147483600";
};

export default function GetnetCheckout({ isOpen, paymentIntentId }: GetnetCheckoutProps) {
  useEffect(() => {
    if (!isOpen || !paymentIntentId) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (looksLikeGetnetNode(node)) {
            forceFixed(node);
          }
          node.querySelectorAll?.("iframe, div").forEach((child) => {
            if (child instanceof HTMLElement && looksLikeGetnetNode(child)) {
              forceFixed(child);
            }
          });
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll("iframe, div").forEach((el) => {
      if (el instanceof HTMLElement && looksLikeGetnetNode(el)) {
        forceFixed(el);
      }
    });

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
    } else {
      const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener("load", launch, { once: true });
      } else {
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = LOADER_SRC;
        script.async = true;
        script.setAttribute("data-testid", "digital-checkout");
        script.onload = launch;
        script.onerror = () => console.error("[Getnet] falló la carga de loader.js");
        document.body.appendChild(script);
      }
    }

    return () => {
      observer.disconnect();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, paymentIntentId]);

  return null;
}
