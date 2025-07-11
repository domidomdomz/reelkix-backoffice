import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductForm from "@product-components/ProductForm";
import type { Product } from "@product-types/product";
import type { ProductFormValues } from "@product-schemas/productFormSchema";
import { productApi } from "@product-services/productApi";

export default function ProductAddPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: productApi.createProduct,

    onMutate: async (newProduct) => {
        // Optimistically update the cache

        // Cancel any outgoing refetches
        // This will prevent the query from being refetched while we update the cache
        // This is important to avoid flickering or showing stale data
        await queryClient.cancelQueries({ queryKey: ["products"] });

        // Snapshot the previous value
        // This allows us to roll back if the mutation fails
        const previous = queryClient.getQueryData<Product[]>(["products"]) || [];

        // Create a fake product object to optimistically update the UI
        // This is a temporary object that will be replaced with the actual product once the mutation succeeds
        const fakeProduct: Product = {
            id: crypto.randomUUID(), // temporary ID
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Assuming imageUrls is an array of strings
            imageUrls: [],
            manufacturerId: newProduct.manufacturerId,
            name: newProduct.name,
            description: newProduct.description || "",
            costPrice: newProduct.costPrice,
            sellingPrice: newProduct.sellingPrice,
            manufacturerName: "Loading…" // optional fallback or lookup
        };

        // Update the cache with the new product
        // This will immediately reflect the new product in the UI
        // We use the spread operator to append the new product to the existing list
        queryClient.setQueryData<Product[]>(["products"], [...previous, fakeProduct]);

        // Return the previous value so we can roll back if needed
        // This is used in the onError callback to revert the cache to its previous state
        return { previous };
    },


    onSuccess: () => {
      toast.success("Product created!");
      navigate("/products");
    },
    onError: () => toast.error("Failed to create product.")
  });

  const handleSubmit = (values: ProductFormValues) => mutation.mutate(values);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </div>
  );
}