'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { usePersistentCart } from "@/hooks/usePersistentCart";

const FACETS = {
  gender: ["male", "female", "unisex"],
  frameColor: ["black", "tortoise", "silver", "gold", "clear", "brown", "red"],
  frameMaterial: ["metal", "acetate", "plastic", "wood"],
  lensColor: ["brown", "green", "grey", "mirrored", "gradient"],
  size: ["s", "m", "l"],
};

const PAGE_SIZE = 6;

function parseQuerySet(value) {
  if (!value) return new Set();
  return new Set(value.split(",").filter(Boolean));
}

function serializeQuerySet(set) {
  return [...set].join(",");
}

export default function ProductsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilters = {};
  Object.keys(FACETS).forEach((facet) => {
    initialFilters[facet] = parseQuerySet(searchParams.get(facet));
  });
  const initialSearch = searchParams.get("search") || "";

  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [search, setSearch] = useState(initialSearch);
  const [page, setPage] = useState(1);
  const [cart, setCart] = usePersistentCart();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([facet, setVal]) => {
      if (setVal.size > 0) {
        params.set(facet, serializeQuerySet(setVal));
      }
    });
    if (search) {
      params.set("search", search);
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [filters, search, router]);

  function toggleFilter(facet, option) {
    setFilters((prev) => {
      const newSet = new Set(prev[facet]);
      newSet.has(option) ? newSet.delete(option) : newSet.add(option);
      return { ...prev, [facet]: newSet };
    });
    setPage(1);
  }

  function clearAll() {
    setFilters(Object.keys(FACETS).reduce((acc, f) => {
      acc[f] = new Set();
      return acc;
    }, {}));
    setSearchInput("");
    setSearch("");
    setPage(1);
  }

  const filteredProducts = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return products.filter((product) => {
      if (search && !product.name.toLowerCase().includes(lowerSearch)) return false;
      return Object.entries(filters).every(([facet, selectedSet]) => {
        if (selectedSet.size === 0) return true;
        return selectedSet.has(product[facet]);
      });
    });
  }, [filters, search]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * PAGE_SIZE);
  }, [filteredProducts, page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      if (displayedProducts.length < filteredProducts.length) {
        setPage((p) => p + 1);
      }
    }
  }, [displayedProducts.length, filteredProducts.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function addToCart(productId) {
    setCart((prev) => {
      const quantity = prev[productId] || 0;
      return { ...prev, [productId]: quantity + 1 };
    });
  }

  const totalCartItems = Object.values(cart).reduce((acc, qty) => acc + qty, 0);

  return (
    <div className="flex min-h-screen p-6 gap-8 bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-300 pr-4 sticky top-24 self-start">
        <h2 className="text-xl font-semibold mb-4">Filter by</h2>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        {Object.entries(FACETS).map(([facet, options]) => (
          <div key={facet} className="mb-6">
            <h3 className="capitalize font-semibold mb-2">
              {facet.replace(/([A-Z])/g, " $1")}
            </h3>
            <ul>
              {options.map((option) => (
                <li key={option} className="mb-1">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[facet].has(option)}
                      onChange={() => toggleFilter(facet, option)}
                      className="mr-2"
                    />
                    <span className="capitalize">{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={clearAll}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Clear All Filters
        </button>

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold">Cart</h3>
          <p>Total items: {totalCartItems}</p>
          {totalCartItems > 0 && (
            <ul className="mt-2 max-h-40 overflow-auto text-sm">
              {Object.entries(cart).map(([id, qty]) => {
                const product = products.find((p) => p.id === id);
                if (!product) return null;
                return (
                  <li key={id} className="flex justify-between">
                    <span>{product.name}</span>
                    <span>x {qty}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Product Grid */}
      <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products found matching the selected filters.
          </p>
        ) : (
          displayedProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <Link
                href={`/products/${product.id}`}
                className="block flex-grow cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                  <p className="mt-2 text-sm text-gray-700">{product.description}</p>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product.id)}
                className="mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
        {displayedProducts.length < filteredProducts.length && (
          <p className="col-span-full text-center text-gray-500 py-4">
            Loading more products...
          </p>
        )}
      </section>
    </div>
  );
}
