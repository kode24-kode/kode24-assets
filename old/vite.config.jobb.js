// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: '',
  build: {
    minify: false,
    outDir: 'dist/jobb',
    rollupOptions: {
      input: {
        article: resolve(__dirname, 'jobb/index.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
