import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      '866c5e8983e9.ngrok-free.app', // Add your ngrok URL here
      'localhost',
    ],
  },
});
