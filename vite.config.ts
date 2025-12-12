import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // CI/CD 环境配置
  build: {
    // 构建优化选项
    sourcemap: false, // 禁用 sourcemap 以减小文件大小
    // minify: "terser", // 使用 terser 进行代码压缩
  },
});
