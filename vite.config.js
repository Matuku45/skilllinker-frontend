import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
server: {
  host: true, // listen on all network interfaces
  port: 5173,
  strictPort: true,
  cors: true, // allow cross-origin requests
},

  },
});
