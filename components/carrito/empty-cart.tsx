import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="bg-white rounded-sm p-12 text-center shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-700 mb-4">Tu carrito está vacío</h2>
      <p className="text-gray-500 mb-8">Parece que aún no has agregado ningún tender a tu carrito.</p>
      <Link href="/" className="inline-block bg-[var(--tender-cyan)] text-white font-bold py-3 px-8 rounded-sm hover:bg-[#5bc0c0] transition-colors">
        Explorar productos
      </Link>
    </div>
  );
}