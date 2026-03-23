import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CartView from "../../components/carrito/cart-view";

export default function CarritoPage() {

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-(--tender-navy-mid) mb-8">Tu Carrito</h1>
        
        <CartView />
      </main>
      <Footer />
    </div>
  );
}