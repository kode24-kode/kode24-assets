// vite.config.ts
import { sentryVitePlugin } from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { defineConfig, loadEnv } from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/vite/dist/node/index.js";
import react from "file:///Users/jorgen.jacobsen/Repos/kode24/kode24-assets/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "/Users/jorgen.jacobsen/Repos/kode24/kode24-assets";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isLocal = env.LOCAL_BUILD === "true";
  const localOutDir = env.LOCAL_OUTDIR;
  return {
    base: "/view-resources/kode24/view/kode24-legacy/",
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
      minify: "esbuild",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qb3JnZW4uamFjb2JzZW4vUmVwb3Mva29kZTI0L2tvZGUyNC1hc3NldHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSBcIkBzZW50cnkvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuICBjb25zdCBpc0xvY2FsID0gZW52LkxPQ0FMX0JVSUxEID09PSBcInRydWVcIjtcbiAgY29uc3QgbG9jYWxPdXREaXIgPSBlbnYuTE9DQUxfT1VURElSO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZTogXCIvdmlldy1yZXNvdXJjZXMva29kZTI0L3ZpZXcva29kZTI0LWxlZ2FjeS9cIixcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICAgIG9yZzogXCJrb2RlMjRcIixcbiAgICAgICAgcHJvamVjdDogXCJqYXZhc2NyaXB0XCIsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IGlzTG9jYWwgPyBsb2NhbE91dERpciA6IFwiZGlzdFwiLCAvLyBcdUQ4M0RcdURDNDggSGVyIGxlZ2dlcyBkZXQgdGlsXG4gICAgICBtaW5pZnk6IFwiZXNidWlsZFwiLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgIGZyb250OiByZXNvbHZlKF9fZGlybmFtZSwgXCJpbmRleC5odG1sXCIpLFxuICAgICAgICAgIGFydGljbGU6IHJlc29sdmUoX19kaXJuYW1lLCBcImFydGljbGUuaHRtbFwiKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLmpzYCxcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5bZXh0XWAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgfSxcbiAgfTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxVSxTQUFTLHdCQUF3QjtBQUN0VyxTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUUzQyxRQUFNLFVBQVUsSUFBSSxnQkFBZ0I7QUFDcEMsUUFBTSxjQUFjLElBQUk7QUFFeEIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsUUFDZixLQUFLO0FBQUEsUUFDTCxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUSxVQUFVLGNBQWM7QUFBQTtBQUFBLE1BQ2hDLFFBQVE7QUFBQSxNQUNSLGVBQWU7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMLE9BQU8sUUFBUSxrQ0FBVyxZQUFZO0FBQUEsVUFDdEMsU0FBUyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxRQUM1QztBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsTUFFQSxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
