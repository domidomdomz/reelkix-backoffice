import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import ManufacturerForm from "../components/ManufacturerForm";
import type { ManufacturerFormValues } from "../components/ManufacturerForm";
import { manufacturerApi } from "@manufacturer-services/manufacturerApi";
import { toast } from "sonner";

export default function ManufacturerEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["manufacturer", id],
    queryFn: () => manufacturerApi.getManufacturerById(id!)
  });

  const mutation = useMutation({
    mutationFn: (values: ManufacturerFormValues) => manufacturerApi.updateManufacturer(id!, values),
    onSuccess: () => {
      toast.success("Manufacturer updated!");
      navigate("/manufacturers");
    },
    onError: () => toast.error("Failed to update manufacturer.")
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