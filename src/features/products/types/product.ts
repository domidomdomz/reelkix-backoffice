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
    costPrice: number;
    sellingPrice: number;
    manufacturerId: string;
}

// export interface ProductImage {
//     imageId: string;
//     url: string;
//     sortOrder: number; // Order of the image in the product gallery
//     altText: string; // Optional alternative text for the image
// }

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
        imageId: string;
        sortOrder: number;
        altText?: string; // Optional alternative text for the image
    }[];
}

export type UploadItem = {
    file: File; // The file to be uploaded
    previewUrl: string; // Optional preview URL for the image
    sortOrder: number; // Order of the image in the product gallery
    altText?: string; // Optional alternative text for the image
    progress: number; // Upload progress percentage
    imageId?: string; // Populate once the image is uploaded
}

export type UploadArgs = {
    file: File;
    sortOrder: number;
    onProgress?: (percent: number) => void;
};