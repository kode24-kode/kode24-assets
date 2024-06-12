import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "kode24",
    project: "javascript"
  })],
  build: {
    rollupOptions: {
      input: {
        front: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },

    sourcemap: true
  },
});