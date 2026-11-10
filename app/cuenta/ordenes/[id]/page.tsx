import Link from "next/link";
import { redirect } from "next/navigation";

import { AccountShell, OrderTypeBadge } from "@/components/cuenta/account-ui";
import { getCustomerOrder, getCustomerOrderVisits } from "@/lib/account/api";
import { formatPrice, getMetadataBySku } from "@/lib/products";
import type { CustomerOrderItem, CustomerOrderVisit } from "@/types/customer";
import { TransferReceiptUpload } from "@/components/gracias/transfer-receipt-upload";

const knownSkus = ["tender-col-8h", "tender-col-6h", "tender-col-4h", "tender-reb-6h", "tender-reb-4h"];

function resolveProductImage(item: CustomerOrderItem) {
  const candidates = [item.id_producto, item.sku, item.id_producto_variante].filter(Boolean) as string[];

  for (const candidate of candidates) {
    const exact = getMetadataBySku(candidate);
    if (exact?.images?.[0]) return exact.images[0];

    const partial = knownSkus.find((sku) => candidate.startsWith(sku));
    if (partial) return getMetadataBySku(partial)?.images?.[0] ?? null;
  }

  return null;
}

function VisitTimeline({ visits }: { visits: CustomerOrderVisit[] }) {
  if (!visits.length) return null;

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(8,30,66,0.4)]">
      <h2 className="font-black text-[var(--tender-navy-mid)]">Historial de visitas</h2>
      <div className="mt-4 space-y-3">
        {visits.map((visit) => {
          const technicalName = [visit.tecnico_nombre, visit.tecnico_apellido].filter(Boolean).join(" ");
          const programmedDate = visit.fecha_programada ? new Date(visit.fecha_programada).toLocaleDateString("es-AR") : null;

          return (
            <article key={visit.id_visita} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-[var(--tender-navy-mid)]">Visita #{visit.id_visita}</p>
                  <p className="mt-1 text-slate-500">{visit.tipo_domicilio} · {visit.estado}</p>
                </div>
                {programmedDate ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{programmedDate}</p> : null}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {visit.direccion ? <p><b>Dirección:</b> {visit.direccion}</p> : null}
                {technicalName ? <p><b>Técnico:</b> {technicalName}</p> : null}
                {visit.franja_inicio || visit.franja_fin ? <p><b>Franja:</b> {[visit.franja_inicio, visit.franja_fin].filter(Boolean).join(" - ")}</p> : null}
                {visit.motivo_estado ? <p><b>Detalle:</b> {visit.motivo_estado}</p> : null}
                {visit.notas_tecnico ? <p className="sm:col-span-2"><b>Notas:</b> {visit.notas_tecnico}</p> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getCustomerOrder(id);
  if (!order) redirect(`/cuenta/ingresar?next=/cuenta/ordenes/${id}`);

  const visits = await getCustomerOrderVisits(id);

  return (
    <AccountShell title={`Orden #${order.id_orden}`}>
      <div className="space-y-5">
        <Link href="/cuenta" className="inline-flex items-center text-sm font-bold text-[var(--tender-cyan)]">
          ← Volver a mi cuenta
        </Link>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(8,30,66,0.4)]">
          <OrderTypeBadge type={order.tipo} />
          <h2 className="mt-3 text-2xl font-black text-[var(--tender-navy-mid)]">{order.producto_resumen}</h2>
          <p className="mt-1 text-sm text-slate-500">{new Date(order.fecha).toLocaleString("es-AR")} · {order.status}</p>

          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3"><b>Pago:</b><div className="mt-1 text-slate-600">{order.payment_method || "Sin método"}</div></div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3"><b>Subtotal:</b><div className="mt-1 text-slate-600">{order.subtotal != null ? formatPrice(Number(order.subtotal)) : "—"}</div></div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3"><b>Total:</b><div className="mt-1 text-slate-600">{order.total_amount != null ? formatPrice(Number(order.total_amount)) : "—"}</div></div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3"><b>Logística:</b><div className="mt-1 text-slate-600">{order.flujo_logistico || order.estado_taller || "Sin novedades"}</div></div>
          </div>

          {order.discount_amount != null && Number(order.discount_amount) > 0 ? <p className="mt-4 text-sm text-slate-500">Descuento aplicado: {formatPrice(Number(order.discount_amount))}</p> : null}
        </section>

        {order.payment_method?.toUpperCase() === "TRANSFERENCIA" && order.tipo === "VENTA" ? (
          <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(8,30,66,0.4)]">
            <h2 className="font-black text-[var(--tender-navy-mid)]">Comprobante de transferencia</h2>
            <p className="my-3 text-sm text-slate-600">Adjuntá un PDF, JPG o PNG de hasta 5 MiB. El pago se confirmará después de verificar la transferencia.</p>
            <TransferReceiptUpload account orderId={Number(order.id_orden)} />
          </section>
        ) : null}

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-36px_rgba(8,30,66,0.4)]">
          <h2 className="font-black text-[var(--tender-navy-mid)]">Items</h2>
          {order.items?.length ? (
            <div className="mt-4 space-y-4">
              {order.items.map((item, index) => {
                const image = resolveProductImage(item);

                return (
                  <article key={item.id_orden_item ?? index} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      {image ? (
                        <div className="h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                          <img src={image} alt={item.nombre || item.id_producto || "Producto"} className="h-full w-full object-cover" />
                        </div>
                      ) : null}
                      <div className="min-w-0 flex-1 text-sm text-slate-600">
                        <p className="font-bold text-[var(--tender-navy-mid)]">{item.nombre || item.id_producto || item.sku || `Item ${index + 1}`}{item.medida ? ` · ${item.medida}` : ""}</p>
                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                          {item.cantidad != null ? <p><b>Cantidad:</b> {item.cantidad}</p> : null}
                          {item.precio_unitario != null ? <p><b>Precio:</b> {formatPrice(Number(item.precio_unitario))}</p> : null}
                          {item.subtotal != null ? <p><b>Subtotal:</b> {formatPrice(Number(item.subtotal))}</p> : null}
                          {item.falla_reportada ? <p className="sm:col-span-2"><b>Falla reportada:</b> {item.falla_reportada}</p> : null}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : <p className="mt-3 text-sm text-slate-500">Esta orden no tiene items visibles.</p>}
        </section>

        <VisitTimeline visits={visits} />
      </div>
    </AccountShell>
  );
}
