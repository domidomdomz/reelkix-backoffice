import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
    <Toaster position="top-right" richColors />
  </React.StrictMode>
);