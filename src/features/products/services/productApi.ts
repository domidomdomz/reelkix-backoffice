import axios from "axios";
import type { CreateProductPayload, Product, UploadedImageResponse, UpdateProductPayload, CreateDraftProductPayload } from "@product-types/product";

const api = axios.create({ baseURL: "https://localhost:7037/api" });

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
    const res = await api.post("/products", payload);
    return res.data;
}

export const createDraftProduct = async (
  payload: CreateDraftProductPayload
): Promise<string> => {
    const { data } = await api.post("/products/draft", payload);
    return data.productId;
}

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

export const updateProduct = async (payload: UpdateProductPayload) => {
    await api.put(`/products/${payload.productId}`, payload);
}

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