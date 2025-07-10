import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ManufacturerListPage from "@manufacturer-pages/ManufacturerListPage";
import NotFoundPage from "../../src/pages/NotFoundPage"; // We'll create this below

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/manufacturers" />} />

        {/* Shared layout */}
        <Route element={<MainLayout />}>
          <Route path="/manufacturers" element={<ManufacturerListPage />} />
          {/* Add more routes here inside the layout */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}