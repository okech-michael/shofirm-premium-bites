import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart as reactStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [tsconfigPaths(), tailwindcss(), reactStart(), react()],
});
