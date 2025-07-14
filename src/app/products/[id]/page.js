// src/app/products/[id]/page.js
import Link from "next/link";
import { products } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Product not found</h1>
        <Link href="/products" className="text-blue-600 underline">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        className="w-full max-h-96 object-cover rounded mb-6"
        loading="lazy"
      />
      <p className="mb-4">{product.description}</p>
      <ul className="mb-6 text-gray-700">
        <li><strong>Price:</strong> ${product.price.toFixed(2)}</li>
        <li><strong>Gender:</strong> {product.gender}</li>
        <li><strong>Frame Color:</strong> {product.frameColor}</li>
        <li><strong>Frame Material:</strong> {product.frameMaterial}</li>
        <li><strong>Lens Color:</strong> {product.lensColor}</li>
        <li><strong>Size:</strong> {product.size.toUpperCase()}</li>
      </ul>

      <AddToCartButton productId={product.id} />

      <Link href="/products" className="text-blue-600 underline mt-6 block">
        Back to products
      </Link>
    </main>
  );
}
