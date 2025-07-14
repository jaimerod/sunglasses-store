import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}
