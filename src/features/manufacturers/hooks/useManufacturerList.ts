import { useQuery } from "@tanstack/react-query";
import { manufacturerApi } from "@manufacturer-services/manufacturerApi";

export const useManufacturerList = () => {
  const query = useQuery({
    queryKey: ["manufacturers"],
    queryFn: manufacturerApi.getManufacturers,
    staleTime: Infinity,
    gcTime: Infinity
  });

  return {
    manufacturers: query.data || [],
    isLoading: query.isLoading
  };
};