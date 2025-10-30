import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/receiver': 'http://127.0.0.1:5000',
      '/api': 'http://127.0.0.1:5000'
    }
  } 
})