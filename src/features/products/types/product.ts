export interface Product {
    id: string;
    name: string;
    description: string;
    costPrice: number;
    sellingPrice: number;
    manufacturerId: string;
    manufacturerName: string;
    imageUrls: string[]; // Array of image URLs
    createdAt: string;
    updatedAt: string;
}

// This type is used for creating a new product
export type CreateProductPayload = {
    name: string;
    description?: string;
    costPrice: number;
    sellingPrice: number;
    manufacturerId: string;
    imageUrls?: string[]; // Optional, can be empty or omitted
};

export type UpdateProductPayload = Partial<CreateProductPayload> & {
    id: string; // Include the product ID for updates
    imageUrls?: string[]; // Optional, can be updated or removed
};