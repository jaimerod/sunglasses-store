"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("lastOrder");
    if (stored) {
      setOrder(JSON.parse(stored));
    }
  }, []);

  if (!order) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Thank You</h1>
        <p>No recent order found.</p>
        <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Browse Products
        </Link>
      </main>
    );
  }

  const { items, shipping, billing, total } = order;

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Thank You for Your Order!</h1>
      <p className="mb-8">A confirmation has been sent to <strong>{shipping.email}</strong>.</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
        <p>{shipping.fullName}</p>
        <p>{shipping.address}</p>
        <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
        <p>{shipping.email}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Billing Information</h2>
        <p>{billing.fullName}</p>
        <p>{billing.address}</p>
        <p>{billing.city}, {billing.state} {billing.zip}</p>
        <p>{billing.email}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul className="space-y-2">
          {items.map(({ product, qty }) => (
            <li key={product.id} className="flex justify-between">
              <span>{product.name} × {qty}</span>
              <span>${(product.price * qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </section>

      <Link href="/products" className="text-blue-600 hover:underline">
        Continue Shopping →
      </Link>
    </main>
  );
}
