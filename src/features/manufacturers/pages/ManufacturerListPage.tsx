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
    if (isError && error instanceof Error) {
      toast.error(`Failed to load manufacturers: ${error.message}`);
    }
    
  }, [isSuccess, isError, error]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-reelkix-red">Manufacturers</h1>
          <Link
              to="/manufacturers/add"
              className="bg-reelkix-red text-white px-3 py-2 rounded hover:bg-red-700"
              title="Add Manufacturer"
          >
              + Add Manufacturer
          </Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading manufacturers</p>}
      {data && <ManufacturerTable data={data} />}
    </div>
  );
}