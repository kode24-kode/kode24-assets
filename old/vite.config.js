/**
 * This Vite config is only used for dev purposes
 */
import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        front: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article/index.html'),
        content: resolve(__dirname, 'content/index.html'),
        jobb: resolve(__dirname, 'jobb/index.html'),
      },
    },
  },
});
