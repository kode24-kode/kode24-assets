// vite.config.ts
import { sentryVitePlugin } from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { defineConfig, loadEnv } from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/vite/dist/node/index.js";
import react from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/jorgen.jacobsen/Repos/kode24/kode24-assets";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log(env.LOCAL_BUILD, env.LOCAL_OUTDIR);
  const isLocal = env.LOCAL_BUILD === "true";
  const localOutDir = env.LOCAL_OUTDIR;
  return {
    plugins: [
      react(),
      sentryVitePlugin({
        org: "kode24",
        project: "javascript"
      })
    ],
    build: {
      outDir: isLocal ? localOutDir : "dist",
      // 👈 Her legges det til
      rollupOptions: {
        input: {
          front: resolve(__vite_injected_original_dirname, "index.html"),
          article: resolve(__vite_injected_original_dirname, "article.html")
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      },
      sourcemap: true
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qb3JnZW4uamFjb2JzZW4vUmVwb3Mva29kZTI0L2tvZGUyNC1hc3NldHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSBcIkBzZW50cnkvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcbiAgY29uc29sZS5sb2coZW52LkxPQ0FMX0JVSUxELCBlbnYuTE9DQUxfT1VURElSKTtcbiAgY29uc3QgaXNMb2NhbCA9IGVudi5MT0NBTF9CVUlMRCA9PT0gXCJ0cnVlXCI7XG4gIGNvbnN0IGxvY2FsT3V0RGlyID0gZW52LkxPQ0FMX09VVERJUjtcblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHJlYWN0KCksXG4gICAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgICAgb3JnOiBcImtvZGUyNFwiLFxuICAgICAgICBwcm9qZWN0OiBcImphdmFzY3JpcHRcIixcbiAgICAgIH0pLFxuICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogaXNMb2NhbCA/IGxvY2FsT3V0RGlyIDogXCJkaXN0XCIsIC8vIFx1RDgzRFx1REM0OCBIZXIgbGVnZ2VzIGRldCB0aWxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBmcm9udDogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiaW5kZXguaHRtbFwiKSxcbiAgICAgICAgICBhcnRpY2xlOiByZXNvbHZlKF9fZGlybmFtZSwgXCJhcnRpY2xlLmh0bWxcIiksXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5qc2AsXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLmpzYCxcbiAgICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxuICAgICAgICB9LFxuICAgICAgfSxcblxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgIH0sXG4gIH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyx3QkFBd0I7QUFDdFcsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN4QyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxHQUFHLEVBQUU7QUFDM0MsVUFBUSxJQUFJLElBQUksYUFBYSxJQUFJLFlBQVk7QUFDN0MsUUFBTSxVQUFVLElBQUksZ0JBQWdCO0FBQ3BDLFFBQU0sY0FBYyxJQUFJO0FBRXhCLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGlCQUFpQjtBQUFBLFFBQ2YsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVEsVUFBVSxjQUFjO0FBQUE7QUFBQSxNQUNoQyxlQUFlO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTCxPQUFPLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFVBQ3RDLFNBQVMsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsUUFDNUM7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLE1BRUEsV0FBVztBQUFBLElBQ2I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
