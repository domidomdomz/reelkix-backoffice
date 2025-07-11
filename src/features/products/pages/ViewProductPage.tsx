import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@product-services/productApi";

export default function ViewProductPage() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductById(id!)
  });

  if (isLoading) return <p>Loading product...</p>;
  if (!product) return <p className="text-red-500">Product not found</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-reelkix-red">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {product.imageUrls.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Product ${idx + 1}`}
            className="aspect-square object-cover w-full rounded shadow"
          />
        ))}
      </div>
    </div>
  );
}