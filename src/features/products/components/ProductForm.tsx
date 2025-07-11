import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select"; // Importing Select for better dropdown UI
import { productFormSchema } from "@product-schemas/productFormSchema"; // Importing the schema and types
import type { ProductFormValues } from "@product-schemas/productFormSchema"; // Importing the schema and types
import { useManufacturerList } from "@manufacturer-hooks/useManufacturerList"; // Lazy-loaded cache hook
import type { ManufacturerOption } from "@manufacturer-types/manufacturer"; // Importing the type for manufacturer options

export default function ProductForm({ onSubmit, isLoading }: {
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
}) {
  const { register, handleSubmit, formState: { errors }, control } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      costPrice: 0,
      sellingPrice: 0
    }
  });

  const { manufacturers, isLoading: isLoadingManufacturers } = useManufacturerList();

  const manufacturerOptions: ManufacturerOption[]  = manufacturers.map((m: any) => ({
    label: m.name,
    value: m.id
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      {/* Name */}
      <div>
        <label className="block font-medium">Product Name</label>
        <input {...register("name")} placeholder="Enter Product Name" className="w-full border px-3 py-2 rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium">Description</label>
        <textarea {...register("description")} placeholder="Enter Product Description" className="w-full border px-3 py-2 rounded" />
      </div>

      {/* Cost Price */}
      <div>
        <label className="block font-medium">Cost Price</label>
        <input type="number" step="0.01" {...register("costPrice", { valueAsNumber: true })} className="w-full border px-3 py-2 rounded" />
        {errors.costPrice && <p className="text-red-500 text-sm">{errors.costPrice.message}</p>}
      </div>

      {/* Selling Price */}
      <div>
        <label className="block font-medium">Selling Price</label>
        <input type="number" step="0.01" {...register("sellingPrice", { valueAsNumber: true })} className="w-full border px-3 py-2 rounded" />
        {errors.sellingPrice && <p className="text-red-500 text-sm">{errors.sellingPrice.message}</p>}
      </div>

      {/* Manufacturer Dropdown */}
      <div>
        <label className="block font-medium">Select Manufacturer</label>
        
        <Controller
            name="manufacturerId"
            control={control}
            render={({ field }) => (
                <Select<ManufacturerOption>
                    options={manufacturerOptions}
                    isSearchable
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    value={manufacturerOptions.find((opt) => opt.value === field.value)}
                    onChange={(selected) => field.onChange(selected?.value)}
                    isDisabled={isLoadingManufacturers}
                    placeholder="Select Manufacturer"
                    className="react-select-container"
                    classNamePrefix="react-select"
                />
            )}
        />
        
        
        {/* {isLoadingManufacturers ? (
          <p className="text-gray-500">Loading manufacturers...</p>
        ) : (
          <select {...register("manufacturerId")} className="w-full border px-3 py-2 rounded">
            <option value="">-- Select --</option>
            {manufacturers.map((m: any) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        )} */}

        {errors.manufacturerId && <p className="text-red-500 text-sm">{errors.manufacturerId.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Add Product"}
      </button>
    </form>
  );
}