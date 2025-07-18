import { Link } from "react-router-dom";

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`bg-reelkix-black text-white w-full md:w-64 p-4 h-full md:static fixed z-40 transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <img src="/assets/reelkix-label-logo.png" alt="Reelkix Logo" className="h-24 w-auto mb-4 hidden md:block" />
      <nav className="space-y-3">

        <Link to="/manufacturers" className="block hover:text-reelkix-red">Manufacturers</Link>
        <Link to="/products" className="block hover:text-reelkix-red">Products</Link>
        
      </nav>
    </aside>
  );
}