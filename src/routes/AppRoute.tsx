import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManufacturerListPage from "@manufacturer-pages/ManufacturerListPage";
import HomeDashboard from "@home-components/HomeDashboard";
import NotFoundPage from "../../src/pages/NotFoundPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Shared layout */}
        <Route element={<MainLayout />}>

            <Route path="/" element={<HomeDashboard />} />
            <Route path="/manufacturers" element={<ManufacturerListPage />} />
            <Route path="/products" element={<Navigate to="/" />} />

            {/* Add more routes here inside the layout */}
        </Route>

        
            
        

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}