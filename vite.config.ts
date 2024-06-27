import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@core': `${path.resolve(__dirname, './src/@core/')}`,
      '@presentation': `${path.resolve(__dirname, './src/@presentation/')}`,
    },
  },
  build: {
    chunkSizeWarningLimit: 16000,
    sourcemap: true,
    rollupOptions: {
        output: {
          entryFileNames: '[name]-[hash].js',
          chunkFileNames: '[name]-[hash].js',
          assetFileNames: '[name]-[hash][extname]',
        },
      },
    // minify: 'terser'
  },
  optimizeDeps: {
    exclude: ['faker', 'cypress'],
  },
  server: {
    port: 3001,
  },
});
