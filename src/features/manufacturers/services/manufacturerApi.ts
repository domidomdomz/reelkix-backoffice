import axios from "axios";
import type { Manufacturer } from "@manufacturer-types/manufacturer";

const api = axios.create({ baseURL: "https://localhost:7037/api" });

export const getManufacturers = async (): Promise<Manufacturer[]> => {
  const res = await api.get<Manufacturer[]>("/manufacturers");
  return res.data;
};