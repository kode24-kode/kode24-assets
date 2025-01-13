/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
export default {
  content: [
    './index.html',
    './article.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        kodepink: 'rgb(39 3 41)',
      },
      keyframes: {
        move: {
          to: {
            strokeDashoffset: '40',
          },
        },
      },
    },
  },
  plugins: [typography],
};
