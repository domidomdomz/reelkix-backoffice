export interface Manufacturer {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export type ManufacturerOption = {
  label: string;
  value: string;
};