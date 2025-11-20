import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'c1261275c3c0.ngrok-free.app', // Add your ngrok URL here
      'localhost',
    ],
  },
});
