import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/s06-station/",
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
});
