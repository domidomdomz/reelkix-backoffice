import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="md:flex">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
