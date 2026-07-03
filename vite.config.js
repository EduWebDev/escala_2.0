import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/escala_2.0/',
  build: {
    sourcemap: false // Remove os mapas de código do build final
  }
})
