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
    // Keep every third-party package external in the generated declarations.
    // The entry files re-export `unplugin` factories whose return types resolve
    // to bundler types (vite -> postcss, webpack -> tapable). Inlining those
    // makes the DTS bundler descend into postcss/tapable, whose `.d.mts` files
    // re-export their own `.d.ts` via value imports and trip MISSING_EXPORT.
    // Referencing them as `import('vite').Plugin` instead is both correct for a
    // published unplugin and avoids the broken inlining.
    // 在生成的声明文件中将所有第三方包保持为外部引用。各入口再导出 unplugin 的工厂函数，
    // 其返回类型会解析到打包器类型（vite -> postcss，webpack -> tapable）。内联这些类型会让
    // DTS 打包器深入 postcss/tapable，而它们的 .d.mts 用 value import 再导出自身 .d.ts，
    // 触发 MISSING_EXPORT。改为以 import('vite').Plugin 方式引用，既符合已发布 unplugin 的惯例，
    // 也规避了有问题的内联。
    deps: {
      dts: {
        neverBundle: (id) => !id.startsWith(".") && !id.startsWith("/"),
      },
    },
  },
});
