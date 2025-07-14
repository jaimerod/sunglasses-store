// src/components/AddToCartButton.js
"use client";

import { usePersistentCart } from "@/hooks/usePersistentCart";

export default function AddToCartButton({ productId }) {
  const [cart, setCart] = usePersistentCart();

  function addToCart() {
    setCart((prev) => {
      const quantity = prev[productId] || 0;
      return { ...prev, [productId]: quantity + 1 };
    });
  }

  return (
    <button
      onClick={addToCart}
      className="mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
    >
      Add to Cart
    </button>
  );
}
