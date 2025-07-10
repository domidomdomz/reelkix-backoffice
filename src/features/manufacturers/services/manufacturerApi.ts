import axios from "axios";
import type { Manufacturer } from "@manufacturer-types/manufacturer";

const api = axios.create({ baseURL: "https://localhost:7037/api" });

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const res = await api.get<Manufacturer[]>("/manufacturers");
  return res.data;
};

export const createManufacturer = async (
  payload: Omit<Manufacturer, "id" | "createdAt" | "updatedAt">
): Promise<Manufacturer> => {
  const res = await api.post("/manufacturers", payload);
  return res.data;
};

export const getManufacturerById = async (id: string): Promise<Manufacturer> => {
  const res = await api.get(`/manufacturers/${id}`);
  return res.data;
};

export const updateManufacturer = async (
  id: string,
  payload: Partial<Omit<Manufacturer, "id" | "createdAt">>
): Promise<Manufacturer> => {
  const res = await api.put(`/manufacturers/${id}`, payload);
  return res.data;
};


export const manufacturerApi = {
  getManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturer
};

