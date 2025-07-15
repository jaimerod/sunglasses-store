"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";

const slides = [
  {
    id: 1,
    title: "Stylish Sunglasses for Every Occasion",
    subtitle: "Find your perfect pair today",
    image: "https://placehold.co/1200x400?text=Slide+1",
  },
  {
    id: 2,
    title: "UV Protection with Style",
    subtitle: "Protect your eyes, look amazing",
    image: "https://placehold.co/1200x400?text=Slide+2",
  },
  {
    id: 3,
    title: "Trendy Frames, Timeless Look",
    subtitle: "Shop the latest collections now",
    image: "https://placehold.co/1200x400?text=Slide+3",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [randomProducts, setRandomProducts] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Slide auto-advance (every 4s)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pick random products after hydration to avoid hydration mismatch
  useEffect(() => {
    setIsHydrated(true);
    const selected = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
    setRandomProducts(selected);
  }, []);

  function handleSignup(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSignupMessage("Please enter a valid email.");
      return;
    }
    setSignupMessage(`Thanks for signing up, ${email}!`);
    setEmail("");
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Hero Slideshow */}
      <section className="relative w-full overflow-hidden rounded-lg shadow-lg mb-8">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`transition-opacity duration-1000 absolute inset-0 ${
              i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-64 object-cover sm:h-96"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4 text-center">
              <h2 className="text-3xl font-bold drop-shadow">{slide.title}</h2>
              <p className="mt-2 text-lg drop-shadow">{slide.subtitle}</p>
            </div>
          </div>
        ))}

        <button
          onClick={() => setIsPaused((p) => !p)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded hover:bg-opacity-75 transition"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? "▶️ Play" : "⏸️ Pause"}
        </button>
      </section>

      {/* Header & Introduction */}
      <section className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Welcome to Sunglass Store</h1>
        <p className="text-lg text-gray-700">
          Discover the latest styles in eyewear, designed for comfort and UV protection.
          Whether you&apos;re hitting the beach or the city streets, we have sunglasses for every style and occasion.
        </p>
      </section>

      {/* 3 Random Product CTAs */}
      {isHydrated && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {randomProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="block border rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            </Link>
          ))}
        </section>
      )}

      {/* Sign Up Form */}
      <section className="max-w-xl mx-auto p-6 bg-gray-100 rounded-lg shadow-inner">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up for Updates</h2>
        <form onSubmit={handleSignup} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow rounded border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
        {signupMessage && (
          <p className="mt-4 text-center text-green-700">{signupMessage}</p>
        )}
      </section>
    </main>
  );
}
