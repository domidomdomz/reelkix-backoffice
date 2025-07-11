import axios from "axios";
import type { Product } from "@product-types/product";

const api = axios.create({ baseURL: "https://localhost:7037/api" });

export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};

// Exporting the API functions as an object
// This allows for easier import in other parts of the application
export const productApi = {
  getProducts,
  getProductById
};