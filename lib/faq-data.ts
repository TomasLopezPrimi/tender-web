/**
 * Single source of truth for the FAQ Q&A pairs.
 *
 * This array is consumed by TWO places — both must stay in sync:
 *   1. `components/home/faq-section.tsx` — the visible Accordion UI
 *   2. `app/page.tsx` — the FAQPage JSON-LD schema
 *
 * Google requires that every Q&A in the FAQPage schema is visible in the page UI.
 * Keeping both derived from this array guarantees the 1:1 correspondence.
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "¿Qué significa Tender?",
    answer:
      "Tender es el nombre de nuestra marca, fundada en Argentina en 1947. Con el tiempo, nuestro nombre se convirtió en la forma popular de llamar al producto en sí, el tendedero. Hoy cuando alguien dice «el tender» en Argentina, está hablando de nosotros.",
  },
  {
    question: "¿Tender es una marca o un producto?",
    answer:
      "Tender es la marca. El producto que fabricamos se llama tendedero. Tender® es la empresa y la marca registrada; tendedero es el nombre genérico del artefacto para secar ropa. Somos «La marca que le dio nombre al tendedero Argentino».",
  },
  {
    question: "¿Por qué a los tendederos se les dice «tender»?",
    answer:
      "Porque Tender® fue la primera empresa en fabricar y comercializar tendederos de calidad en Argentina. Con décadas de presencia y liderazgo en el mercado, nuestro nombre de marca pasó a ser el término cotidiano que los argentinos usan para referirse al producto. Es el mismo fenómeno que ocurre con otras marcas que se convierten en sinónimo de su categoría.",
  },
  {
    question: "¿Qué tipos de tendederos fabrica Tender®?",
    answer:
      "Fabricamos dos líneas principales: Tender Colgante (se instala en el techo, ideal para balcones y lavaderos) y Tender Rebatible (se fija a la pared y se pliega cuando no se usa). Todos son 100% industria argentina.",
  },
  {
    question: "¿Tender hace envíos a todo el país?",
    answer:
      "Sí. Realizamos envíos a todo el territorio argentino. Podés comprar desde nuestra tienda online en tender.com.ar y recibir tu Tender® en la puerta de tu casa.",
  },
];
