import { z } from "zod"; // Importing zod for schema validation

export const productFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  costPrice: z.number().min(0),
  sellingPrice: z.number().min(0),
  manufacturerId: z.string().uuid()
});

export type ProductFormValues = z.infer<typeof productFormSchema>; // TypeScript type inferred from the schema