import { defineConfig } from "vite-plus";

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: "vp pack",
        input: [{ auto: true }, "!dist/**", "!node_modules/**"],
      },
    },
  },
  pack: {
    entry: {
      index: "src/index.ts",
      vite: "src/vite.ts",
      webpack: "src/webpack.ts",
      rollup: "src/rollup.ts",
      esbuild: "src/esbuild.ts",
      nuxt: "src/nuxt.ts",
    },
    sourcemap: true,
    deps: {
      // Keep every node_modules dependency as an external `import type` reference
      // in the generated declarations instead of inlining it. The entry points pull
      // in heavy type trees (webpack/tapable, vite/lightningcss/postcss) whose
      // CommonJS .d.ts files rolldown-plugin-dts cannot bundle, and a plugin library
      // should reference these packages rather than inline them anyway. Match by
      // resolved path (not just bare specifier) so first-party modules such as
      // ./types stay bundled.
      dts: {
        neverBundle: (id) => id.includes("node_modules") || !/^(\.|\/|[a-zA-Z]:)/.test(id),
      },
    },
  },
});
