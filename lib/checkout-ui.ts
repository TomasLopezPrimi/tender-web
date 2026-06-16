/**
 * checkout-ui.ts
 *
 * Helpers de DOM para el flujo de checkout (scroll a errores de formulario).
 * Solo usable en cliente: tocan `document`.
 */

/**
 * Hace scroll al primer campo con error de validación. Si no encuentra uno
 * marcado en rojo, cae al inicio de la sección indicada.
 */
export function scrollToFirstError(fallbackSectionId = "checkout-form-section") {
  requestAnimationFrame(() => {
    const firstError = document.querySelector<HTMLElement>(".border-red-300");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus({ preventScroll: true });
    } else {
      document
        .getElementById(fallbackSectionId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/** Hace scroll al inicio de la sección de dirección de entrega. */
export function scrollToAddressSection() {
  requestAnimationFrame(() => {
    document
      .getElementById("address-form-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
