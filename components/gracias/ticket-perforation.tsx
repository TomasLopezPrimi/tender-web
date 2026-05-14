export function TicketPerforation() {
  return (
    <div className="relative h-8 bg-white">
      <div className="absolute inset-x-8 top-1/2 border-t border-dashed border-[var(--tender-gold)]/45" />
      <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--tender-gray-bg)]" />
      <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-[var(--tender-gray-bg)]" />
    </div>
  );
}
