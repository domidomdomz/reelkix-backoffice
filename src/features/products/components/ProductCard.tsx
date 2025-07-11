import { Link } from "react-router-dom";
import type { Product } from "@product-types/product";

export default function ProductCard({ product }: { product: Product }) {
  const previewUrl = product.imageUrls[0];

  return (
    <Link to={`/products/${product.id}`} className="block group">
      <div className="relative bg-white shadow rounded overflow-hidden hover:shadow-lg transition-all">
        <img
          src={previewUrl}
          alt={product.name}
          className="aspect-square object-cover w-full"
        />
        <div className="p-2">
          <h3 className="text-sm font-medium text-gray-800 group-hover:text-reelkix-red truncate">
            {product.name} ({product.manufacturerName})
          </h3>
        </div>
      </div>
    </Link>
  );
}