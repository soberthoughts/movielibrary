import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { webcrypto } from 'crypto'

// Polyfill for Node 16
globalThis.crypto = webcrypto

export default defineConfig({
  plugins: [vue()],
  define: {
    global: {}
  },
  server: {
    port: 5173 // Ensure this matches your dev server port
  }
})