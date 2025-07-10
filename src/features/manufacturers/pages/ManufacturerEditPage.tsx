import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ManufacturerForm from "../components/ManufacturerForm";
import type { ManufacturerFormValues } from "../components/ManufacturerForm";
import { manufacturerApi } from "@manufacturer-services/manufacturerApi";
import { toast } from "sonner";

export default function ManufacturerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["manufacturer", id],
    queryFn: () => manufacturerApi.getManufacturerById(id!),
  });

  const mutation = useMutation({
    mutationFn: (values: ManufacturerFormValues) => manufacturerApi.updateManufacturer(id!, values),

    onMutate: async (newData) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ["manufacturer", id] });

        // Snapshot previous data
        const previous = queryClient.getQueryData(["manufacturer", id]);

        // Optimistically update the cache
        queryClient.setQueryData(["manufacturer", id], (oldData: any) => ({
            ...oldData,
            ...newData
        }));

        return { previous };
    },

    onSuccess: () => {
        toast.success("Manufacturer updated!");
        navigate("/manufacturers");
    },

    onError: (_, __, context) => {
        toast.error("Failed to update manufacturer. Reverting changes...");
        // Rollback to previous data
        if (context?.previous) {
            queryClient.setQueryData(["manufacturer", id], context.previous);
        }
    },

    onSettled: () => {
        // Always refetch after mutation
        queryClient.invalidateQueries({ queryKey: ["manufacturer", id] });
        queryClient.invalidateQueries({ queryKey: ["manufacturers"] });
    }
  });

  const handleSubmit = (values: ManufacturerFormValues) => mutation.mutate(values);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p className="text-red-500">Manufacturer not found</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Edit Manufacturer</h1>
      <ManufacturerForm defaultValues={data} onSubmit={handleSubmit} />
    </div>
  );
}