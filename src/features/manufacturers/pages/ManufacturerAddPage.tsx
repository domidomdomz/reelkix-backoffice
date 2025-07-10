import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ManufacturerForm from "../components/ManufacturerForm";
import type { ManufacturerFormValues } from "../components/ManufacturerForm"
import { manufacturerApi } from "@manufacturer-services/manufacturerApi";
import { useNavigate } from "react-router-dom";

export default function ManufacturerAddPage() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: manufacturerApi.createManufacturer,
    onSuccess: () => {
      toast.success("Manufacturer created successfully!");
      navigate("/manufacturers");
    },
    onError: () => toast.error("Failed to create manufacturer.")
  });

  const handleSubmit = (values: ManufacturerFormValues) => mutation.mutate(values);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Add Manufacturer</h1>
      <ManufacturerForm onSubmit={handleSubmit} />
    </div>
  );
}