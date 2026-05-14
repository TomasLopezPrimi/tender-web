import { MessageCircle, ShieldCheck, Truck } from "lucide-react";

export function TrustRow() {
  const items = [
    { icon: Truck, title: "Envío", text: "3 a 7 días hábiles" },
    { icon: MessageCircle, title: "Atención personal", text: "Lun-Vie 9-18hs" },
    { icon: ShieldCheck, title: "Pago seguro", text: "Datos protegidos" },
  ];

  return (
    <div className="grid gap-3 rounded-2xl bg-[var(--tender-gray-bg)] p-4 md:grid-cols-3 md:gap-4 md:p-5">
      {items.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex items-center gap-3 rounded-xl bg-white/80 px-3 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--tender-cyan)]/10 text-[var(--tender-cyan)]">
            <Icon size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--tender-navy)]">{title}</p>
            <p className="text-xs text-[var(--tender-text-muted)]">{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
