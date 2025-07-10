import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1)    
});

export type ManufacturerFormValues = z.infer<typeof schema>;

export default function ManufacturerForm({
  defaultValues,
  onSubmit
}: {
  defaultValues?: ManufacturerFormValues;
  onSubmit: (values: ManufacturerFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ManufacturerFormValues>({
    defaultValues,
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block font-medium">Name</label>
        <input {...register("name")} className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <input {...register("description")} className="w-full border px-3 py-2 rounded" />
      </div>
      <button type="submit" className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700">
        Submit
      </button>
    </form>
  );
}