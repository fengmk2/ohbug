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
      ohbug: "src/bin/ohbug.ts",
    },
    dts: true,
    // Pin the CLI command name. With `exports: true`, vp pack auto-detects the
    // bin from the shebang and derives the command name from the package name
    // (`@ohbug/cli` -> `cli`); map it explicitly to keep the published `ohbug`.
    exports: {
      bin: { ohbug: "src/bin/ohbug.ts" },
    },
    sourcemap: true,
  },
});
