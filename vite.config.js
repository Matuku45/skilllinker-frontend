import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,       // listen on all network interfaces
    port: 5173,
    strictPort: true,
    cors: true,       // allow cross-origin requests for dev
    allowedHosts: [
      '48c272048b7e.ngrok-free.app',   // your current ngrok URL
      'skilllinker-frontend.fly.dev',  // your deployed frontend
      'localhost'                       // always keep localhost for dev
    ],
  },
});
