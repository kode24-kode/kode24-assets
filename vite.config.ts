import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const isLocal = env.LOCAL_BUILD === "true";
  const localOutDir = env.LOCAL_OUTDIR;

  return {
    base: "/view-resources/kode24/view/kode24-legacy/",
    plugins: [
      react(),
      sentryVitePlugin({
        org: "kode24",
        project: "javascript",
      }),
    ],
    build: {
      outDir: isLocal ? localOutDir : "dist", // 👈 Her legges det til
      minify: "esbuild",
      rollupOptions: {
        input: {
          front: resolve(__dirname, "index.html"),
          article: resolve(__dirname, "article.html"),
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },

      sourcemap: true,
    },
  };
});
