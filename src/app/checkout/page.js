"use client";

import { usePersistentCart } from "@/hooks/usePersistentCart";
import { products } from "@/data/products";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = usePersistentCart();
  const router = useRouter();

  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });

  const [billing, setBilling] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiration: "",
    cvv: "",
  });

  const cartItems = Object.entries(cart)
    .map(([id, qty]) => {
      const product = products.find((p) => p.id === id);
      if (!product) return null;
      return { product, qty };
    })
    .filter(Boolean);

  const total = cartItems.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );

  function handleSubmit(e) {
    e.preventDefault();

    const order = {
      items: cartItems,
      shipping,
      billing: sameAsShipping ? shipping : billing,
      total,
    };

    // Store order in localStorage for the thank-you page
    localStorage.setItem("lastOrder", JSON.stringify(order));
    setCart({}); // Clear the cart
    router.push("/thank-you");
  }

  function handleChange(setter, key) {
    return (e) => setter((prev) => ({ ...prev, [key]: e.target.value }));
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="Full Name"
              value={shipping.fullName}
              onChange={handleChange(setShipping, "fullName")}
              className="input"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={shipping.email}
              onChange={handleChange(setShipping, "email")}
              className="input"
            />
            <input
              required
              type="text"
              placeholder="Address"
              value={shipping.address}
              onChange={handleChange(setShipping, "address")}
              className="input col-span-full"
            />
            <input
              required
              type="text"
              placeholder="City"
              value={shipping.city}
              onChange={handleChange(setShipping, "city")}
              className="input"
            />
            <input
              required
              type="text"
              placeholder="State"
              value={shipping.state}
              onChange={handleChange(setShipping, "state")}
              className="input"
            />
            <input
              required
              type="text"
              placeholder="ZIP"
              value={shipping.zip}
              onChange={handleChange(setShipping, "zip")}
              className="input"
            />
          </div>
        </section>

        {/* Same as shipping checkbox */}
        <section>
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              checked={sameAsShipping}
              onChange={() => setSameAsShipping(!sameAsShipping)}
            />
            Billing address is the same as shipping
          </label>
        </section>

        {/* Billing */}
        {!sameAsShipping && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Full Name"
                value={billing.fullName}
                onChange={handleChange(setBilling, "fullName")}
                className="input"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={billing.email}
                onChange={handleChange(setBilling, "email")}
                className="input"
              />
              <input
                required
                type="text"
                placeholder="Address"
                value={billing.address}
                onChange={handleChange(setBilling, "address")}
                className="input col-span-full"
              />
              <input
                required
                type="text"
                placeholder="City"
                value={billing.city}
                onChange={handleChange(setBilling, "city")}
                className="input"
              />
              <input
                required
                type="text"
                placeholder="State"
                value={billing.state}
                onChange={handleChange(setBilling, "state")}
                className="input"
              />
              <input
                required
                type="text"
                placeholder="ZIP"
                value={billing.zip}
                onChange={handleChange(setBilling, "zip")}
                className="input"
              />
            </div>
          </section>
        )}

        {/* Payment */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              required
              type="text"
              placeholder="Card Number"
              value={payment.cardNumber}
              onChange={handleChange(setPayment, "cardNumber")}
              className="input"
            />
            <input
              required
              type="text"
              placeholder="MM/YY"
              value={payment.expiration}
              onChange={handleChange(setPayment, "expiration")}
              className="input"
            />
            <input
              required
              type="text"
              placeholder="CVV"
              value={payment.cvv}
              onChange={handleChange(setPayment, "cvv")}
              className="input"
            />
          </div>
        </section>

        {/* Cart summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between py-2 border-b">
              <span>
                {product.name} × {qty}
              </span>
              <span>${(product.price * qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </form>

      <style jsx>{`
        .input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 6px;
          background: #fff;
        }
      `}</style>
    </main>
  );
}
