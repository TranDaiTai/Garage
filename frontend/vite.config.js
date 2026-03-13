import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  tailwindcss()
  ],
  server:{
    proxy: {
      '/api':{
        // target: 'http://myapp.local:5000',
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    },
    port:5173,
    // allowedHosts: ['myapp.local'],
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  }
})
