import { defineConfig } from "vitest/config";
import path from "path";

/** Schema validation loop — node environment, no React test setup. */
export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["lib/**/*.image-object.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
