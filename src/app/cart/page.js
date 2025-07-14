"use client";

import { useState, useEffect } from "react";
import { usePersistentCart } from "@/hooks/usePersistentCart";
import { products } from "@/data/products";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function CartPage() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [cart, setCart] = usePersistentCart();

  useEffect(() => {
    // Ensure hydration on client side only
    if (typeof window !== "undefined") {
      setIsHydrated(true);
    }
  }, []);

  if (!isHydrated) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <p>Loading cart...</p>
      </main>
    );
  }

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean);

  const totalPrice = cartItems.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );

  function removeItem(productId) {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  }

  function updateQuantity(productId, qty) {
    const newQty = Math.max(1, qty);
    setCart((prev) => ({
      ...prev,
      [productId]: newQty,
    }));
  }

  if (cartItems.length === 0) {
    return (
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link
          href="/products"
          className="text-blue-600 hover:underline mt-4 inline-block"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2 text-left">Product</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(({ product, qty }) => (
            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <td className="border px-2 py-2 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2 text-center">
                ${product.price.toFixed(2)}
              </td>
              <td className="border px-4 py-2 text-center">
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) =>
                    updateQuantity(product.id, parseInt(e.target.value, 10) || 1)
                  }
                  className="w-16 text-center border rounded px-1 py-0.5"
                />
              </td>
              <td className="border px-4 py-2 text-center">
                ${(product.price * qty).toFixed(2)}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove from cart"
                  aria-label="Remove item"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 dark:bg-gray-800 font-semibold">
            <td colSpan={4} className="border px-4 py-2 text-right">
              Total:
            </td>
            <td className="border px-4 py-2 text-center">
              ${totalPrice.toFixed(2)}
            </td>
            <td className="border px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-6 flex justify-between items-center">
        <Link href="/products" className="text-blue-600 hover:underline">
          ← Continue Shopping
        </Link>
        <Link
          href="/checkout"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Proceed to Checkout →
        </Link>
      </div>
    </main>
  );
}
