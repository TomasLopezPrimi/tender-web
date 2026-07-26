"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ExternalLink, Loader2, Lock } from "lucide-react";

interface GetnetCheckoutProps {
  isOpen: boolean;
  paymentIntentId: string;
  checkoutUrl?: string | null;
  orderId?: number | null;
  onClose: () => void;
}

const LOADER_SRC =
  process.env.NEXT_PUBLIC_GETNET_LOADER_URL ||
  "https://www.globalgetnet.com/digital-checkout/loader.js";

const SCRIPT_ID = "getnet-digital-checkout-loader";
const LIGHTBOX_MARKER_CLASS = "tender-getnet-lightbox-fixed";
// Si en este tiempo no apareció el iframe de pago, mostramos la salida alternativa.
const LIGHTBOX_TIMEOUT_MS = 12000;
// Cada cuánto verificamos que el lightbox siga en pantalla, y cuántas fallas seguidas
// toleramos antes de cerrar (el usuario pudo cerrarlo con la X de Getnet).
const WATCHDOG_INTERVAL_MS = 1500;
const WATCHDOG_MAX_MISSES = 2;

type GetnetLoader = {
  init: (cfg: { paymentIntentId: string; checkoutType: "lightbox" | "iframe" }) => void;
};

/** "loading": esperando el iframe de pago · "ready": visible · "error": no abrió */
type LoaderStatus = "loading" | "ready" | "error";

/** Contenedores o frames que inyecta el loader de Getnet. */
const looksLikeGetnetNode = (el: Element): boolean => {
  if (el.tagName === "IFRAME") {
    const src = (el as HTMLIFrameElement).src || "";
    if (src.includes("globalgetnet") || src.includes("getnet")) return true;
  }
  const id = el.id?.toLowerCase() ?? "";
  if (id.includes("getnet") || id === "digitalcheckout") return true;
  // Nuestra propia marca contiene "getnet": si no la descartáramos, un resto de un
  // intento anterior se detectaría como lightbox nuevo.
  const cls = (el.getAttribute("class") || "").toLowerCase().split(LIGHTBOX_MARKER_CLASS).join("");
  if (cls.includes("getnet") || cls.includes("digital-checkout")) return true;
  return false;
};

/**
 * El pago en sí: solo el iframe cuenta como lightbox abierto. El contenedor puede
 * existir con el iframe todavía sin cargar, y ahí seguimos esperando.
 */
const looksLikeGetnetFrame = (el: Element): boolean => {
  if (el.tagName !== "IFRAME") return false;
  const src = (el as HTMLIFrameElement).src || "";
  if (src.includes("globalgetnet") || src.includes("getnet")) return true;
  // El loader crea el iframe dentro de su contenedor y le asigna el src después.
  return el.closest(`.${LIGHTBOX_MARKER_CLASS}`) !== null;
};

const isVisible = (el: HTMLElement): boolean =>
  document.contains(el) && el.getBoundingClientRect().height > 0;

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

export default function GetnetCheckout({
  isOpen,
  paymentIntentId,
  checkoutUrl,
  orderId,
  onClose,
}: GetnetCheckoutProps) {
  const [status, setStatus] = useState<LoaderStatus>("loading");
  const statusRef = useRef<LoaderStatus>("loading");

  const updateStatus = (next: LoaderStatus) => {
    statusRef.current = next;
    setStatus(next);
  };

  useEffect(() => {
    if (!isOpen || !paymentIntentId) return;

    updateStatus("loading");

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Fija el nodo a pantalla completa y, si es el iframe de pago, oculta nuestro overlay.
    const adopt = (el: HTMLElement) => {
      if (!looksLikeGetnetNode(el) && !looksLikeGetnetFrame(el)) return;
      forceFixed(el);
      if (looksLikeGetnetFrame(el)) updateStatus("ready");
    };

    const scanDocument = () => {
      document.querySelectorAll("iframe, div").forEach((el) => {
        if (el instanceof HTMLElement) adopt(el);
      });
    };

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          adopt(node);
          node.querySelectorAll?.("iframe, div").forEach((child) => {
            if (child instanceof HTMLElement) adopt(child);
          });
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });

    scanDocument();

    const launch = () => {
      const w = window as unknown as { loader?: GetnetLoader };
      if (!w.loader) {
        console.error("[Getnet] loader.js no expuso window.loader");
        updateStatus("error");
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
        script.onerror = () => {
          console.error("[Getnet] falló la carga de loader.js");
          updateStatus("error");
        };
        document.body.appendChild(script);
      }
    }

    const timeoutId = window.setTimeout(() => {
      if (statusRef.current !== "loading") return;
      // Último barrido antes de dar por fallido: no queremos tapar un pago que sí abrió.
      scanDocument();
      if (statusRef.current !== "loading") return;
      updateStatus("error");
    }, LIGHTBOX_TIMEOUT_MS);

    // El lightbox se cierra desde la X de Getnet, no desde nuestra UI: si desapareció,
    // cerramos nosotros para devolverle el scroll y el carrito al usuario.
    let misses = 0;
    const watchdogId = window.setInterval(() => {
      if (statusRef.current !== "ready") return;

      const nodes = Array.from(document.querySelectorAll(`.${LIGHTBOX_MARKER_CLASS}`));
      const stillThere = nodes.some((el) => el instanceof HTMLElement && isVisible(el));
      misses = stillThere ? 0 : misses + 1;
      if (misses >= WATCHDOG_MAX_MISSES) onClose();
    }, WATCHDOG_INTERVAL_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      window.clearInterval(watchdogId);
      document.body.style.overflow = previousOverflow;

      // Restos del lightbox: si el pago nunca abrió, sobra todo; si abrió, solo lo
      // que ya no se ve. Dejarlos haría que el próximo intento crea que hay uno vivo.
      const removeAll = statusRef.current !== "ready";
      document.querySelectorAll(`.${LIGHTBOX_MARKER_CLASS}`).forEach((el) => {
        if (el instanceof HTMLElement && (removeAll || !isVisible(el))) el.remove();
      });
    };
  }, [isOpen, paymentIntentId, onClose]);

  // Con el lightbox de Getnet arriba, cualquier cosa nuestra estorba.
  if (!isOpen || status === "ready") return null;

  return (
    <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-[var(--tender-navy)]/85 px-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-sm bg-white p-6 shadow-2xl">
        {status === "loading" ? (
          <div className="flex flex-col items-center text-center">
            <Loader2 size={32} className="animate-spin text-[var(--tender-cyan)]" />
            <p className="mt-4 text-base font-bold text-[var(--tender-navy-mid)]">
              Estamos abriendo el pago seguro
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Getnet va a mostrarte la ventana para ingresar tu tarjeta. Puede tardar unos segundos.
            </p>
            <p className="mt-4 flex items-center justify-center gap-1 text-[11px] text-gray-400">
              <Lock size={11} /> No guardamos los datos de tu tarjeta
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 text-xs font-semibold text-gray-500 underline underline-offset-2 hover:text-gray-700"
            >
              Cancelar y volver al carrito
            </button>
          </div>
        ) : (
          <div className="flex flex-col text-center">
            <AlertCircle size={30} className="mx-auto text-amber-500" />
            <p className="mt-4 text-base font-bold text-[var(--tender-navy-mid)]">
              No pudimos abrir la ventana de pago
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Puede ser un bloqueador de anuncios o una conexión inestable. Podés pagar en una
              pestaña nueva o volver al carrito e intentar de nuevo.
            </p>

            {orderId != null && (
              <p className="mt-4 rounded-sm bg-gray-50 p-3 text-xs text-gray-600">
                Tu pedido <strong>#{orderId}</strong> quedó registrado como pendiente de pago. No se
                hizo ningún cargo a tu tarjeta.
              </p>
            )}

            <div className="mt-5 space-y-2">
              {checkoutUrl && (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--tender-navy)] py-3 text-sm font-bold text-white transition-colors hover:bg-[var(--tender-navy-mid)]"
                >
                  <ExternalLink size={15} />
                  Abrir el pago en una pestaña nueva
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-sm border border-gray-200 py-3 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50"
              >
                Volver al carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
