import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,      // Puerto del servidor
    host: true       // Permite acceso desde IP local (otros dispositivos en la red)
  }
});
