import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
            // Try alternative ports if the main one fails
            const BACKUP_PORTS = [5001, 5002, 5003, 5004, 5005];
            for (const port of BACKUP_PORTS) {
              try {
                proxy.web(_req, _res, { target: `http://localhost:${port}` });
                console.log(`Switched to port ${port}`);
                break;
              } catch (e) {
                console.error(`Failed to connect to port ${port}:`, e);
              }
            }
          });
        },
      },
    },
  },
});
