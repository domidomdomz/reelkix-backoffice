import { z } from "zod"; // Importing zod for schema validation

export const productFormSchema = z.object({
    productId: z.string().optional(), // Optional ID for existing products
    name: z.string({ error: "Product name is required." }).min(1, "Product name is required."),
    description: z.string().optional(),
    costPrice: z.number({ error: "Cost price is required." }).min(0, "Cost price must be at least 0."),
    sellingPrice: z.number({ error: "Selling price is required." }).min(0, "Selling price must be at least 0."),
    manufacturerId: z.string({ error: "Manufacturer is required." }).uuid("Manufacturer is required.")

}).refine((data) => data.sellingPrice >= data.costPrice, {
    message: "Selling price must be greater than or equal to cost price",
    path: ["sellingPrice"]
});

export type ProductFormValues = z.infer<typeof productFormSchema>; // TypeScript type inferred from the schema