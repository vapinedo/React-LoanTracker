import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@feature': '/src/feature',
      '@shared': '/src/shared',
      '@firebaseConfig': '/src/firebaseConfig',
    },
  },
});