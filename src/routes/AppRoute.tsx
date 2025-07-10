import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManufacturerListPage from "@manufacturer-pages/ManufacturerListPage";
import ManufacturerAddPage from "@manufacturer-pages/ManufacturerAddPage";
import NotFoundPage from "../../src/pages/NotFoundPage";

const HomeDashboard = lazy(() => import("@home-components/HomeDashboard"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Shared layout */}
        <Route element={<MainLayout />}>

            <Route path="/" element={
                            <Suspense fallback={<p className="text-center mt-20">Loading home screen...</p>}>
                                <HomeDashboard />
                            </Suspense>
            } />

            <Route path="/manufacturers" element={<ManufacturerListPage />} />
            <Route path="/manufacturers/add" element={<ManufacturerAddPage />} />

            <Route path="/products" element={<Navigate to="/" />} />

            {/* Add more routes here inside the layout */}
        </Route>

        
            
        

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}