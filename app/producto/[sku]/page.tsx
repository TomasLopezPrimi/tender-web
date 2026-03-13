// app/producto/[sku]/page.tsx

export async function generateStaticParams() {
  
  const skus = ['producto-1', 'producto-2', 'producto-3'];
  
  return skus.map((sku) => ({
    sku: sku,
  }));
}

export default function Page({ params }: { params: { sku: string } }) {
  const { sku } = params;
  return <div>Producto: {sku}</div>;
}