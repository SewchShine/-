import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // 可选：允许局域网访问
    port: 5173,
    proxy: {
      // 仅代理以 /people 开头的请求
      "^/people/.*": {
        target: "http://172.20.10.7:8080",
        changeOrigin: true,
      },
      // 仅代理以 /admin 开头的请求
      "^/admin/.*": {
        target: "http://172.20.10.7:8080",
        changeOrigin: true,
      },
      "/birth/.*": {
        target: "http://172.20.10.7:8080",
        changeOrigin: true,
      },
      "/people": {
        target: "http://172.20.10.7:8080",
        changeOrigin: true,
      },
      "/death": {
        target: "http://172.20.10.7:8080", 
        changeOrigin: true,
      },
      "/login": {
        target: "http://172.20.10.7:8080", 
        changeOrigin: true,
      },
    },
  },
});
