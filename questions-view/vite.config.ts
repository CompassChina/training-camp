import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './src',
  plugins: [react()],
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    outDir: '../../docs',
    rollupOptions: {
      output: {
        entryFileNames: 'index.js',
        assetFileNames: 'index.[ext]',
      },
    },
  },
})
