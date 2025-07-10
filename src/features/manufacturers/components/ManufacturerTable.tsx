import type { Manufacturer } from "@manufacturer-types/manufacturer";
import { Link } from "react-router-dom";

export default function ManufacturerTable({ data }: { data: Manufacturer[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-md">
        <thead className="bg-reelkix-black text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Created</th>
            <th className="px-4 py-2 text-left">Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id} className="border-b">
              <td className="px-4 py-2">
                <Link to={`/manufacturers/${m.id}/edit`} className="text-blue-500 hover:underline">
                  {m.name}
                </Link>
              </td>
              <td className="px-4 py-2">{m.description ?? "—"}</td>
              <td className="px-4 py-2">{new Date(m.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(m.updatedAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}