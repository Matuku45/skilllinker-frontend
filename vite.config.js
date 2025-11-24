import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
server: {
  host: true,
  port: 5173,
  proxy: {
    '/api': {
      target: 'https://skilllinker-backend.onrender.com',
      changeOrigin: true,
      secure: false,
    },
  },
},

  },
});
