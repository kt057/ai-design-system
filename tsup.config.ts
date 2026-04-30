import { defineConfig } from "tsup";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  target: "es2022",
  platform: "browser",
  external: ["react", "react-dom", "react/jsx-runtime"],
  outDir: "dist",
  async onSuccess() {
    // Prepend the React Client Component directive after bundling. Putting it
    // in source or via banner doesn't survive Rollup, so we patch the output
    // directly. Every export in this package depends on `react-aria-components`,
    // which uses client-only React APIs — without this directive the bundle
    // cannot be imported from a Next.js Server Component.
    const out = resolve("dist/index.js");
    const body = readFileSync(out, "utf8");
    if (!body.startsWith('"use client"')) {
      writeFileSync(out, `"use client";\n${body}`);
    }
  },
});
