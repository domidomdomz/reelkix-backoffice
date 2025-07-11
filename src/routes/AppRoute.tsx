import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManufacturerListPage from "@manufacturer-pages/ManufacturerListPage";
import ManufacturerAddPage from "@manufacturer-pages/ManufacturerAddPage";
import ManufacturerEditPage from "@manufacturer-pages/ManufacturerEditPage";
import ProductListPage from "@product-pages/ProductListPage";
import ViewProductPage from "@product-pages/ViewProductPage";
import NotFoundPage from "../../src/pages/NotFoundPage";
import ProductAddPage from "@product-pages/ProductAddPage";

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
            <Route path="/manufacturers/:id/edit" element={<ManufacturerEditPage />} />

            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/add" element={<ProductAddPage />} />
            <Route path="/products/:id" element={<ViewProductPage />} />

            {/* Add more routes here inside the layout */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}