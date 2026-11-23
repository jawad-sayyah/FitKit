import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const srcPath = fileURLToPath(new URL("./src", import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    port: 9999,
    open: true,
  },

  resolve: {
    alias: {
      "@": srcPath,
    },
  },

  test: {
    environment: "jsdom",
    setupFiles: "./src/test-setup.ts",
  },
});
