import { Link } from "react-router-dom";

export default function HomeDashboard() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-3xl font-bold text-reelkix-red">Welcome to reelkix BackOffice</h1>
      <p className="mt-2 text-reelkix-black">Manage manufacturers, products, and more—all in one place.</p>

      <div className="mt-6 flex justify-center gap-4">
        <Link to="/manufacturers" className="px-4 py-2 bg-reelkix-red text-white rounded hover:bg-red-700">
          Go to Manufacturers
        </Link>
        <Link to="/products" className="px-4 py-2 bg-reelkix-black text-white rounded hover:bg-black">
          Go to Products
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Total Manufacturers</p>
          <h2 className="text-2xl font-bold text-reelkix-red">24</h2>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Products Listed</p>
          <h2 className="text-2xl font-bold text-reelkix-black">152</h2>
        </div>
      </div>

      <div className="mt-8 text-left max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-reelkix-black mb-2">Getting Started</h3>
        <ul className="list-disc ml-5 text-gray-700 space-y-1">
          <li>Create your first Manufacturer</li>
          <li>Upload product listings</li>
          <li>Create Orders</li>
        </ul>
      </div>
    </div>
  );
}