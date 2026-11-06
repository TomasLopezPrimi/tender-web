import { Suspense } from "react";
import { GraciasContent } from "@/components/gracias/gracias-content";
import { config } from "@/config";

export default function GraciasPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p>Cargando...</p>
        </div>
      }
    >
      <GraciasContent bankDetails={config.bankDetails} />
    </Suspense>
  );
}
