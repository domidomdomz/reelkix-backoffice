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

export interface CreateDraftProductPayload {
  name: string;
  description?: string;
  manufacturerId: string;
}

export interface ProductImage {
    imageId: string;
    url: string;
    sortOrder: number; // Order of the image in the product gallery
    altText: string; // Optional alternative text for the image
}

export interface UploadedImageResponse {
    imageId: string; // ID of the uploaded image
}

export interface UpdateProductPayload {
    productId: string;
    name: string;
    description?: string;
    manufacturerId: string;
    costPrice: number;
    sellingPrice: number;
    images: {
        id: string;
        sortOrder: number;
        altText?: string; // Optional alternative text for the image
    }[];
}