import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig(({ mode }) => ({
  plugins: [react(), mkcert()],
  base: '/',
  esbuild: mode === 'production'
    ? {
      drop: ['console', 'debugger']
    }
    : {},
  server: {
    https: true,
    port: 5173,
    strictPort: true,
  },
}))
