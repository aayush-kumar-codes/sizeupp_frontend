// vite.config.js
import { defineConfig } from "file:///root/sizeupp/sizeupp_frontend/node_modules/vite/dist/node/index.js";
import react from "file:///root/sizeupp/sizeupp_frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          const match = id.match(/src\/pages\/(.*)\.jsx?/);
          if (match) {
            return match[1];
          }
          const accountMatch = id.match(/src\/pages\/Account\/(.*)\.jsx?/);
          if (accountMatch) {
            return `Account/${accountMatch[1]}`;
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9zaXpldXBwL3NpemV1cHBfZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3NpemV1cHAvc2l6ZXVwcF9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9zaXpldXBwL3NpemV1cHBfZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICAvLyBCdW5kbGUgZWFjaCByb3V0ZSBpbiB0aGUgXCJwYWdlc1wiIGRpcmVjdG9yeSBzZXBhcmF0ZWx5XG4gICAgICAgICAgY29uc3QgbWF0Y2ggPSBpZC5tYXRjaCgvc3JjXFwvcGFnZXNcXC8oLiopXFwuanN4Py8pO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEJ1bmRsZSBlYWNoIHJvdXRlIGluIHRoZSBcIkFjY291bnRcIiBkaXJlY3Rvcnkgc2VwYXJhdGVseVxuICAgICAgICAgIGNvbnN0IGFjY291bnRNYXRjaCA9IGlkLm1hdGNoKC9zcmNcXC9wYWdlc1xcL0FjY291bnRcXC8oLiopXFwuanN4Py8pO1xuICAgICAgICAgIGlmIChhY2NvdW50TWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiBgQWNjb3VudC8ke2FjY291bnRNYXRjaFsxXX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0USxTQUFTLG9CQUFvQjtBQUN6UyxPQUFPLFdBQVc7QUFFbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUVmLGdCQUFNLFFBQVEsR0FBRyxNQUFNLHdCQUF3QjtBQUMvQyxjQUFJLE9BQU87QUFDVCxtQkFBTyxNQUFNLENBQUM7QUFBQSxVQUNoQjtBQUdBLGdCQUFNLGVBQWUsR0FBRyxNQUFNLGlDQUFpQztBQUMvRCxjQUFJLGNBQWM7QUFDaEIsbUJBQU8sV0FBVyxhQUFhLENBQUMsQ0FBQztBQUFBLFVBQ25DO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
