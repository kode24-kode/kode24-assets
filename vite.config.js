// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        front: resolve(__dirname, 'index.html'),
        article: resolve(__dirname, 'article.html'),
        content: resolve(__dirname, 'content.html'),
        jobb: resolve(__dirname, 'jobb.html'),
      },
    },
  },
});
