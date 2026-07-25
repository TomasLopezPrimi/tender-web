import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  LogOut,
  MapPin,
  Package,
} from "lucide-react";

import { logoutCustomerAction } from "@/actions/customer-auth";
import { ProfessionalRequestForm, ProfileCompletionForm } from "@/components/cuenta/profile-forms";
import { isProfessionalCustomer } from "@/lib/customer";
import { getProfessionalRubroLabel } from "@/lib/professional-rubros";
import { formatPrice } from "@/lib/products";
import type { CustomerAddress, CustomerEmails, CustomerOrderSummary, CustomerProfile } from "@/types/customer";

export function AccountShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4f7f8] px-4 pb-16 pt-6 sm:px-6 sm:pb-20 sm:pt-10">
      <h1 className="sr-only">{title}</h1>
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

export function AuthCard({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <main className="min-h-screen bg-gray-50 px-4 py-12"><section className="mx-auto max-w-md rounded-sm border border-gray-100 bg-white p-6 shadow-sm"><h1 className="text-2xl font-black text-[var(--tender-navy-mid)]">{title}</h1><p className="mb-6 mt-2 text-sm text-gray-500">{intro}</p>{children}</section></main>;
}

function ProfessionalState({ profile }: { profile: CustomerProfile }) {
  if (!isProfessionalCustomer(profile.tipo_cliente)) return null;

  const state = {
    ACTIVO: ["Perfil profesional verificado", null],
    PENDIENTE_APROBACION: ["Estamos revisando tu perfil", "Podés hacer tus compras."],
    RECHAZADO: ["No pudimos validar tu solicitud", "Revisá tus datos o contactanos."],
    SUSPENDIDO: ["Cuenta profesional pausada", "Podés seguir haciendo tus compras."],
  }[profile.estado_cuenta];

  return (
    <div className="border-t border-white/15 pt-4">
      <div className="flex gap-3">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--tender-cyan)] shadow-[0_0_0_5px_rgba(67,199,218,0.12)]" />
        <div>
          <p className="text-sm font-bold text-white">{state[0]}</p>
          {state[1] ? <p className="mt-1 max-w-md text-sm leading-5 text-white/65">{state[1]}</p> : null}
        </div>
      </div>
    </div>
  );
}

function AccountCredential({ profile }: { profile: CustomerProfile }) {
  const rubro = getProfessionalRubroLabel(profile.rubro_profesional);
  const professional = isProfessionalCustomer(profile.tipo_cliente);

  return (
    <section className="relative isolate overflow-hidden rounded-[26px] bg-[var(--tender-navy)] p-5 text-white shadow-[0_24px_70px_-34px_rgba(8,30,66,0.75)] sm:p-7">
      <div className="absolute -right-16 -top-20 -z-10 h-56 w-56 rounded-full border-[42px] border-white/[0.035]" />
      <div className="absolute bottom-0 right-0 -z-10 h-24 w-24 bg-[linear-gradient(135deg,transparent_50%,rgba(67,199,218,0.17)_50%)]" />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[var(--tender-cyan)]">Tender®</p>
          <p className="mt-5 font-serif text-3xl leading-none sm:text-4xl">
            {profile.nombre} {profile.apellido}
          </p>
          {professional && profile.estudio_empresa ? <p className="mt-2 text-sm font-semibold text-white/75">{profile.estudio_empresa}</p> : null}
          {professional && rubro ? <p className="mt-2 text-sm text-white/55">{rubro}</p> : null}
        </div>
        {professional && profile.estado_cuenta === "ACTIVO" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-white/75">
            <Check className="h-3 w-3 text-[var(--tender-cyan)]" />
            Verificado
          </span>
        ) : null}
      </div>
      {professional ? <div className="mt-8"><ProfessionalState profile={profile} /></div> : null}
    </section>
  );
}

export function OrderTypeBadge({ type }: { type: string }) {
  const label = type === "SERVICE" ? "Service" : type === "GARANTIA" ? "Garantía" : "Compra";
  return <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--tender-cyan)]">{label}</span>;
}

function orderStatusLabel(status: string) {
  return status.replaceAll("_", " ").toLocaleLowerCase("es-AR");
}

export function OrderCard({ order }: { order: CustomerOrderSummary }) {
  return (
    <Link
      href={`/cuenta/ordenes/${order.id_orden}`}
      className="group grid min-h-24 grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200/80 py-4 transition-colors last:border-0 hover:text-[var(--tender-cyan)] sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-8"
    >
      <div className="min-w-0">
        <OrderTypeBadge type={order.tipo} />
        <h3 className="mt-1 truncate font-semibold text-[var(--tender-navy-mid)]">{order.producto_resumen}</h3>
        <p className="mt-1 text-xs text-slate-500">#{order.id_orden} · {new Date(order.fecha).toLocaleDateString("es-AR")}</p>
      </div>
      <div className="hidden text-right sm:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Estado</p>
        <p className="mt-1 text-sm font-medium capitalize text-slate-700">{orderStatusLabel(order.status)}</p>
      </div>
      <div className="flex items-center gap-2 text-right">
        {order.total_amount != null ? <strong className="text-sm text-[var(--tender-navy-mid)] sm:text-base">{formatPrice(Number(order.total_amount))}</strong> : null}
        <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--tender-cyan)]" />
      </div>
      <p className="col-span-2 -mt-3 text-xs font-medium capitalize text-slate-500 sm:hidden">{orderStatusLabel(order.status)}</p>
    </Link>
  );
}

function Addresses({ addresses }: { addresses: CustomerAddress[] }) {
  return (
    <section className="border-t border-slate-200 pt-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-[var(--tender-cyan)]" />
        <h2 className="font-bold text-[var(--tender-navy-mid)]">Direcciones</h2>
      </div>
      {addresses.length ? (
        <ul className="mt-3 divide-y divide-slate-100">
          {addresses.map((address) => (
            <li key={address.id_direccion} className="py-3 text-sm leading-5 text-slate-600 first:pt-1">
              {address.calle} {address.numero}, {address.ciudad}
            </li>
          ))}
        </ul>
      ) : <p className="mt-3 text-sm text-slate-500">Se guardan durante la compra.</p>}
    </section>
  );
}

export function AccountDashboard({ profile, emails, addresses, orders }: { profile: CustomerProfile; emails: CustomerEmails | null; addresses: CustomerAddress[]; orders: CustomerOrderSummary[] }) {
  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">Mi cuenta</p>
          <h2 className="mt-1 font-serif text-3xl text-[var(--tender-navy)] sm:text-4xl">Hola, {profile.nombre}</h2>
        </div>
        <form action={logoutCustomerAction}>
          <button className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-xs font-bold text-slate-500 transition hover:bg-white hover:text-[var(--tender-navy)] sm:px-4">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Cerrar sesión</span>
            <span className="sm:hidden">Salir</span>
          </button>
        </form>
      </header>

      <nav className="sticky top-2 z-20 mb-5 grid grid-cols-2 rounded-full border border-white/80 bg-white/90 p-1 shadow-sm backdrop-blur sm:hidden" aria-label="Secciones de la cuenta">
        <a href="#datos" className="rounded-full px-4 py-2.5 text-center text-xs font-bold text-[var(--tender-navy)]">Datos</a>
        <a href="#actividad" className="rounded-full px-4 py-2.5 text-center text-xs font-bold text-slate-500">Actividad</a>
      </nav>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:gap-8">
        <AccountCredential profile={profile} />

        <aside id="datos" className="scroll-mt-20 rounded-[26px] bg-white p-5 shadow-[0_20px_60px_-44px_rgba(8,30,66,0.45)] sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ProfileCompletionForm profile={profile} />
          <div className="mt-6 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Email</p>
              {!profile.email_verificado ? <span className="text-xs font-semibold text-amber-700">Sin verificar</span> : null}
            </div>
            <p className="mt-2 break-all text-sm font-medium text-[var(--tender-navy-mid)]">{profile.email}</p>
            {emails?.secundarios?.length ? <p className="mt-2 break-all text-xs text-slate-500">{emails.secundarios.join(", ")}</p> : null}
          </div>
          <Addresses addresses={addresses} />
          <ProfessionalRequestForm profile={profile} />
        </aside>

        <section id="actividad" className="scroll-mt-20 rounded-[26px] bg-white px-5 py-6 shadow-[0_20px_60px_-44px_rgba(8,30,66,0.45)] sm:px-7 lg:col-start-1 lg:row-start-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-[var(--tender-cyan)]" />
              <h2 className="font-bold text-[var(--tender-navy-mid)]">Actividad</h2>
            </div>
            {orders.length ? <span className="text-xs font-medium text-slate-400">{orders.length} movimientos</span> : null}
          </div>
          <div className="mt-2">
            {orders.length ? orders.slice(0, 6).map((order) => <OrderCard key={order.id_orden} order={order} />) : (
              <div className="py-8 text-center">
                <p className="text-sm text-slate-500">Todavía no hay movimientos.</p>
                <Link href="/productos" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[var(--tender-navy)] hover:text-[var(--tender-cyan)]">
                  Ver productos <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
