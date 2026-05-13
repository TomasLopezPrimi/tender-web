import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--tender-cyan)] mb-4">Error 404</p>
        <h1 className="text-4xl font-serif font-bold text-[var(--tender-navy)] mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          La página que buscás no existe o fue movida.
        </p>
        <Link
          href="/"
          className="inline-block bg-[var(--tender-cyan)] text-white font-bold py-3 px-8 rounded-sm hover:bg-[var(--tender-navy)] transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}