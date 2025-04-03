import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { webcrypto } from 'crypto'

// Node 16 Polyfill (Secure Alternative)
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = webcrypto
}

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Required for browser builds
      'crypto': 'crypto-browserify',
      'stream': 'stream-browserify',
      'util': 'util/'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      }
    }
  }
})