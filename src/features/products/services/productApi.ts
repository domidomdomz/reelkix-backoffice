import axios from "axios";
import type { CreateProductPayload, Product, UploadedImageResponse, UpdateProductPayload, CreateDraftProductPayload } from "@product-types/product";

const api = axios.create({ baseURL: "https://localhost:7037/api" });

/**
 * Get all products
 * @return {Promise<Product[]>} - A promise that resolves to an array of products
 */
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

/**
 * Get a product by ID
 * @param id - The ID of the product to retrieve
 * @return {Promise<Product>} - A promise that resolves to the product object
 */
export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

/**
 * Create a new product
 * @param payload - The payload containing product details to create a new product
 * @returns {Promise<Product>} - A promise that resolves to the created product object
 */
export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
    const res = await api.post("/products", payload);
    return res.data;
}

/**
 * Create a draft product
 * @param payload - The payload containing product details to create a draft product
 * @returns {Promise<string>} - A promise that resolves to the ID of the created draft product
 */
export const createDraftProduct = async (
  payload: CreateDraftProductPayload
): Promise<string> => {
    const { data } = await api.post("/products/draft", payload);
    return data.productId;
}

/**
 * Upload a product image
 * @param productId 
 * @param file 
 * @param sortOrder 
 * @param onProgress 
 * @returns 
 */
export const uploadProductImage = async (
  productId: string,
  file: File,
  sortOrder: number,
  onProgress?: (progress: number) => void
): Promise<UploadedImageResponse> => {
    const formData = new FormData();
    formData.append("sortOrder", sortOrder.toString());
    formData.append("file", file);

    const { data } = await api.post<UploadedImageResponse>(
      `/products/${productId}/images`,
      formData,
      {
        // Let axios set content type and boundary automatically
        onUploadProgress: (evt) => {
          if (!evt.total) return; // Avoid division by zero
          // If onProgress callback is provided, call it with the progress percentage
          // This is useful for showing upload progress in the UI
          if (onProgress) {
            const progress = Math.round((evt.loaded * 100) / evt.total);
            onProgress(progress);
          }
        }
      }
    );

    return data;
};

/**
 * Save changes to an existing product and set IsDraft to false
 * @param payload - The payload containing updated product details
 * @returns {Promise<void>} - A promise that resolves when the product is updated
 */
export const updateProduct = async (payload: UpdateProductPayload) => {
    await api.put(`/products/${payload.productId}`, payload);
}

/**
 * Delete a draft product by ID
 * @param productId - The ID of the draft product to delete
 * @returns {Promise<void>} - A promise that resolves when the draft product is deleted
 */
export const deleteDraftProduct = async (productId: string): Promise<void> => {
  await api.delete(`/products/draft/${productId}`);
};


// Exporting the API functions as an object
// This allows for easier import in other parts of the application
export const productApi = {
    getProducts,
    getProductById,
    createProduct,
    createDraftProduct,
    uploadProductImage,
    updateProduct,
    deleteDraftProduct
};