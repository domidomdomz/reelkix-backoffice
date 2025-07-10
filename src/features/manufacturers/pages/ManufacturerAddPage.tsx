import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ManufacturerForm from "../components/ManufacturerForm";
import type { ManufacturerFormValues } from "../components/ManufacturerForm"
import { manufacturerApi } from "@manufacturer-services/manufacturerApi";
import { useNavigate } from "react-router-dom";

export default function ManufacturerAddPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: manufacturerApi.createManufacturer,

    onMutate: async (newManufacturer: ManufacturerFormValues) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["manufacturers"] });

      // Optimistically update the cache
      const previousManufacturers = queryClient.getQueryData<ManufacturerFormValues[]>(["manufacturers"]) || [];

      queryClient.setQueryData(["manufacturers"], (oldData: ManufacturerFormValues[] | undefined) => {
        const newData = {...newManufacturer, id: crypto.randomUUID, createdAt: new Date().toISOString()};
        // Append the new manufacturer to the existing data
        return oldData ? [...oldData, newData] : [newData];
      });

      return { previousManufacturers };
    },

    onError: (_error, _variables, context) => { 
      toast.error("Failed to create manufacturer. Reverting changes...");
      // Rollback to previous data
      if (context?.previousManufacturers) {
        queryClient.setQueryData(["manufacturers"], context.previousManufacturers);
      }
    },

    onSuccess: () => {
      toast.success("Manufacturer created successfully!");
      navigate("/manufacturers");
    },

    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
    },
    retry: 2, // Retry up to 2 times on failure
    retryDelay: attempt => attempt * 1000, // Exponential back off. Wait 1s, 2s, etc. between retries
  });

  const handleSubmit = (values: ManufacturerFormValues) => mutation.mutate(values);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Add Manufacturer</h1>
      <ManufacturerForm onSubmit={handleSubmit} isLoading={mutation.isPending} />
    </div>
  );
}