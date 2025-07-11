import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = dirname(__filename);


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@common-types": resolve(__dirname, "src/features/common/types"),
      "@common-utils": resolve(__dirname, "src/features/common/utils"),
      "@manufacturer-types": resolve(__dirname, "src/features/manufacturers/types"),
      "@manufacturer-services": resolve(__dirname, "src/features/manufacturers/services"),
      "@manufacturer-pages": resolve(__dirname, "src/features/manufacturers/pages"),
      "@manufacturer-components": resolve(__dirname, "src/features/manufacturers/components"),
      "@manufacturer-hooks": resolve(__dirname, "src/features/manufacturers/hooks"),
      "@product-types": resolve(__dirname, "src/features/products/types"),
      "@product-schemas": resolve(__dirname, "src/features/products/schemas"),
      "@product-services": resolve(__dirname, "src/features/products/services"),
      "@product-pages": resolve(__dirname, "src/features/products/pages"),
      "@product-components": resolve(__dirname, "src/features/products/components"),
      "@home-components": resolve(__dirname, "src/features/home/components"),
    }
  }
});
