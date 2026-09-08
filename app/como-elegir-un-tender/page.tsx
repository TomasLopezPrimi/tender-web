import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo elegir un tender de ropa según tu espacio | Tender®",
  description: "Guía para elegir un tender de ropa: cómo medir, cuándo conviene un modelo colgante o rebatible y cuándo consultar antes de comprar.",
  alternates: { canonical: absoluteUrl("/como-elegir-un-tender") },
};

export default function ComoElegirUnTenderPage() {
  return (
    <main className="bg-background py-12 md:py-20">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-(--tender-cyan)">Guía de elección</p>
        <h1 className="mt-3 font-serif text-4xl text-(--tender-navy) md:text-5xl">Cómo elegir un tender según tu espacio</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-(--tender-text-muted)">Para elegir un tender de ropa, primero medí el espacio disponible y definí si podés aprovechar el techo o necesitás una solución de pared. Los modelos Tender® colgantes y rebatibles se eligen según esa condición, la cantidad de hilos y el uso cotidiano.</p>
        <p className="mt-4 text-sm text-(--tender-text-muted)">Contenido revisado por el equipo de Tender Original.</p>

        <div className="mt-12 space-y-10">
          <section>
            <h2 className="font-serif text-3xl text-(--tender-navy)">1. Medí antes de elegir</h2>
            <p className="mt-3 leading-relaxed text-(--tender-text-muted)">Tomá las medidas del ancho y largo disponibles y dejá margen para usar el tender con comodidad. Si tenés dudas sobre el lugar de instalación, consultá antes de comprar: las condiciones del techo o de la pared importan tanto como el tamaño del modelo.</p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-(--tender-navy)">2. Techo o pared: elegí el tipo de tender</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6"><h3 className="font-serif text-2xl text-(--tender-navy)">Colgante</h3><p className="mt-2 leading-relaxed text-(--tender-text-muted)">Un tender colgante aprovecha el espacio aéreo y permite regular la altura de secado. Es una opción para balcones, lavaderos y otros espacios con techo apto para instalarlo.</p></div>
              <div className="rounded-2xl border border-border bg-card p-6"><h3 className="font-serif text-2xl text-(--tender-navy)">Rebatible</h3><p className="mt-2 leading-relaxed text-(--tender-text-muted)">Un tender rebatible se instala en la pared y se pliega cuando no está en uso. Puede convenir cuando no se puede perforar el techo o se busca liberar el paso al terminar de tender.</p></div>
            </div>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-(--tender-navy)">3. Considerá la cantidad de hilos</h2>
            <p className="mt-3 leading-relaxed text-(--tender-text-muted)">Los modelos actuales se ofrecen con distintas cantidades de hilos. Compará las medidas publicadas de cada variante y elegí una capacidad acorde a la ropa que acostumbrás secar y al espacio que mediste.</p>
          </section>
          <section>
            <h2 className="font-serif text-3xl text-(--tender-navy)">4. Cuándo conviene consultar</h2>
            <p className="mt-3 leading-relaxed text-(--tender-text-muted)">Consultá por WhatsApp si necesitás instalación paga, reparación o asesoramiento. La cobertura de instalación incluye CABA, zona norte del AMBA y sectores del primer cordón, sujeta a consulta. En un tender colgante, nunca abras la caja del mecanismo.</p>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 text-sm sm:flex-row sm:gap-6">
          <Link href="/productos" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">Conocé los tipos de tender</Link>
          <Link href="/tienda" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">Ver modelos, medidas y precios</Link>
          <Link href="/servicio-tecnico" className="font-semibold text-(--tender-cyan) underline-offset-4 hover:underline">Consultar instalación y servicio</Link>
        </div>
      </article>
    </main>
  );
}
