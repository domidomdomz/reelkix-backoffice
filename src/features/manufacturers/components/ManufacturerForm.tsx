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
  onSubmit,
  isLoading
}: {
  defaultValues?: ManufacturerFormValues;
  onSubmit: (values: ManufacturerFormValues) => void;
  isLoading?: boolean;
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label className="block font-medium">Name</label>
        <input {...register("name")} className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-medium">Description</label>
        <input {...register("description")} className="w-full border px-3 py-2 rounded" />
      </div>
      <button type="submit" 
              disabled={isLoading}
              className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700">
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span>Saving...</span>
          </>
          ) : ("Save")
        }

      </button>
    </form>
  );
}