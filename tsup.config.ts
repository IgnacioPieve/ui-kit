import { copyFileSync } from "node:fs";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    preset: "src/preset.ts",
  },
  // Dual format on purpose: the app bundlers take ESM, but Tailwind loads
  // `tailwind.config.ts` through jiti, which resolves the `require` condition.
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  // Everything in `dependencies` / `peerDependencies` is external by default.
  external: ["react", "react-dom", "tailwindcss"],
  onSuccess: async () => {
    copyFileSync("src/styles.css", "dist/styles.css");
  },
});
