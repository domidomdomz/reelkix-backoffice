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