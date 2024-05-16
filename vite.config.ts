import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': '/src',
      '@mocks': '/src/mocks',
      '@stores': '/src/stores',
      '@routes': '/src/routes',
      '@models': '/src/models',
      '@features': '/src/features',
      '@services': '/src/services',
      '@components': '/src/components',
      '@firebaseConfig': '/src/firebaseConfig',
    },
  },
});