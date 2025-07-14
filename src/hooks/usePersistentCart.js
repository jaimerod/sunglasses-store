import { useState, useEffect } from "react";

export function usePersistentCart() {
  // Lazy initialize cart from localStorage or fallback to {}
  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return {}; // SSR safe
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return [cart, setCart];
}
