import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Bundle each route in the "pages" directory separately
          const match = id.match(/src\/pages\/(.*)\.jsx?/);
          if (match) {
            return match[1];
          }

          // Bundle each route in the "Account" directory separately
          const accountMatch = id.match(/src\/pages\/Account\/(.*)\.jsx?/);
          if (accountMatch) {
            return `Account/${accountMatch[1]}`;
          }
        },
      },
    },
  },
});
