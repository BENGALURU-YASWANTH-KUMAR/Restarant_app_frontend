import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Remove any tailwindcss() references if Tailwind is uninstalled
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true
  }
})
