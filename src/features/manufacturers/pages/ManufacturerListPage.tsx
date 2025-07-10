import { useQuery } from "@tanstack/react-query";
import { getManufacturers } from "@manufacturer-services/manufacturerApi";
import ManufacturerTable from "../components/ManufacturerTable";

export default function ManufacturerListPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: getManufacturers,
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Manufacturers</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading manufacturers</p>}
      {data && <ManufacturerTable data={data} />}
    </div>
  );
}