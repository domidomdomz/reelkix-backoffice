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
      "@manufacturer-types": resolve(__dirname, "src/features/manufacturers/types"),
      "@manufacturer-services": resolve(__dirname, "src/features/manufacturers/services"),
      "@manufacturer-pages": resolve(__dirname, "src/features/manufacturers/pages"),
      "@manufacturer-components": resolve(__dirname, "src/features/manufacturers/components"),
      "@home-components": resolve(__dirname, "src/features/home/components"),
    }
  }
});
