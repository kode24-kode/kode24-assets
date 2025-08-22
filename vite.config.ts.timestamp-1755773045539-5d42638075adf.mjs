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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvam9yZ2VuLmphY29ic2VuL1JlcG9zL2tvZGUyNC9rb2RlMjQtYXNzZXRzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qb3JnZW4uamFjb2JzZW4vUmVwb3Mva29kZTI0L2tvZGUyNC1hc3NldHMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSBcIkBzZW50cnkvdml0ZS1wbHVnaW5cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCBcIlwiKTtcblxuICBjb25zdCBpc0xvY2FsID0gZW52LkxPQ0FMX0JVSUxEID09PSBcInRydWVcIjtcbiAgY29uc3QgbG9jYWxPdXREaXIgPSBlbnYuTE9DQUxfT1VURElSO1xuXG4gIHJldHVybiB7XG4gICAgYmFzZTogXCIvdmlldy1yZXNvdXJjZXMva29kZTI0L3ZpZXcva29kZTI0LWxlZ2FjeS9cIixcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgc2VudHJ5Vml0ZVBsdWdpbih7XG4gICAgICAgIG9yZzogXCJrb2RlMjRcIixcbiAgICAgICAgcHJvamVjdDogXCJqYXZhc2NyaXB0XCIsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIGJ1aWxkOiB7XG4gICAgICBvdXREaXI6IGlzTG9jYWwgPyBsb2NhbE91dERpciA6IFwiZGlzdFwiLCAvLyBcdUQ4M0RcdURDNDggSGVyIGxlZ2dlcyBkZXQgdGlsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgZnJvbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcImluZGV4Lmh0bWxcIiksXG4gICAgICAgICAgYXJ0aWNsZTogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiYXJ0aWNsZS5odG1sXCIpLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uanNgLFxuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiBgYXNzZXRzL1tuYW1lXS5qc2AsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IGBhc3NldHMvW25hbWVdLltleHRdYCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG5cbiAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsd0JBQXdCO0FBQ3RXLFNBQVMsY0FBYyxlQUFlO0FBQ3RDLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFIeEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFFBQU0sVUFBVSxJQUFJLGdCQUFnQjtBQUNwQyxRQUFNLGNBQWMsSUFBSTtBQUV4QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxRQUNmLEtBQUs7QUFBQSxRQUNMLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRLFVBQVUsY0FBYztBQUFBO0FBQUEsTUFDaEMsZUFBZTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0wsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxVQUN0QyxTQUFTLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQzVDO0FBQUEsUUFDQSxRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxNQUVBLFdBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
