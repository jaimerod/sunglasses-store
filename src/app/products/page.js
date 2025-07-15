// app/products/page.tsx
import { Suspense } from "react";
import ProductsClient from "@/components/productsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
