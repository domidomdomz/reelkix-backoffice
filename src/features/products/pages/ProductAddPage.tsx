import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ProductForm from "@product-components/ProductForm";
import type { Product } from "@product-types/product";
import type { ProductFormValues } from "@product-schemas/productFormSchema";
import { productApi } from "@product-services/productApi";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import type { CreateProductErrorResponse } from "@common-types/api";
import { parseApiValidationErrors } from "@common-utils/parseApiErrors";

export default function ProductAddPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setError } = useForm<ProductFormValues>();

  const mutation = useMutation({

    // mutationFn is the function that will be called to perform the mutation
    mutationFn: productApi.createProduct,
    
    retry: 2, // Retry up to 2 times on failure
    retryDelay: (attempt) => attempt * 1000, // Exponential back off. Wait 1s, 2s, etc. between retries

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

    onError: (error: AxiosError<CreateProductErrorResponse>) => {
        const errorData = error.response?.data;

        if (Array.isArray(errorData?.Errors)) {
            
            parseApiValidationErrors<ProductFormValues>(
                errorData.Errors,
                setError,
                (msg) => toast.error(msg)
            );
            
        } else {
            // If the error is not an array, show a generic error message
            toast.error("Unexpected error. Please try again.");
        }
    },

    onSettled: () => {
      // Always refetch after mutation to ensure the cache is up-to-date
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = (values: ProductFormValues) => mutation.mutate(values);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Add Product</h1>
      <ProductForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </div>
  );
}