import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // 👈 change this to any fixed port you want
    strictPort: true // 👈 ensures Vite will fail if port is taken instead of switching
  }
})
