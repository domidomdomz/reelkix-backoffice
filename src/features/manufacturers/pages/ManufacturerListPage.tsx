import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getManufacturers } from "@manufacturer-services/manufacturerApi";
import ManufacturerTable from "../components/ManufacturerTable";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ManufacturerListPage() {
  const { data, isLoading, error, isSuccess, isError } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: getManufacturers,

  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Manufacturer list loaded successfully!");
    } else if (isError && error instanceof Error) {
      toast.error(`Failed to load manufacturers: ${error.message}`);
    }
    
  }, [isSuccess, isError, error]);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-reelkix-red">Manufacturers</h1>

      <div className="mb-4">
        <Link to="/manufacturers/add" className="bg-reelkix-red text-white px-4 py-2 rounded hover:bg-red-700">
          Add Manufacturer
        </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading manufacturers</p>}
      {data && <ManufacturerTable data={data} />}
    </div>
  );
}