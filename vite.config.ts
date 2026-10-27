import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Build output goes to /static so it never collides with the public /assets folder (logo, photos).
export default defineConfig({
  plugins: [react()],
  build: { assetsDir: "static" }
});
