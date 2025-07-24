import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { productApi } from "@product-services/productApi";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getProducts
  });

  
  return (
    <div>
        {/* Page title and add product button */}
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-reelkix-red">Product Gallery</h1>
            <Link
                to="/products/add"
                className="bg-reelkix-red text-white px-3 py-2 rounded hover:bg-red-700"
                title="Add Product"
            >
                + Add Product
            </Link>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Failed to load products</p>}
        {!data?.length && !isLoading && !error && <p>No products found</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data?.length && data!.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}