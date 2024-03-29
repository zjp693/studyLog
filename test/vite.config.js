import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//按需自动引入插件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      threshold: 300,
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     output: {
  //       entryFileNames: "[name]-[hash].[ext]",
  //       chunkFileNames: "[name]-[hash].[ext]",
  //       assetFileNames: "ext/[name]-[hash][ext]",
  //       // assetFileNames: (assetInfo) => {
  //       //   var rootName = "static";
  //       //   var info = assetInfo.name.split(".");
  //       //   var extType = info[info.length - 1];
  //       //   if (
  //       //     /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
  //       //   ) {
  //       //     extType = "media";
  //       //   } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
  //       //     extType = "img";
  //       //   } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
  //       //     extType = "fonts";
  //       //   }
  //       //   return `static/${extType}/[name]-[hash][extname]`;
  //       // },
  //       // chunkFileNames: `static/js/[name]-[hash].js`,
  //       // entryFileNames: `static/js/[name]-[hash].js`,
  //     },
  //   },
  // },

  build: {
    rollupOptions: {
      output: {
        // 最小化拆分包
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        }, // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "js/[name].[hash].js", // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "js/[name].[hash].js", // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: "[ext]/[name].[hash].[ext]", // 拆分js到模块文件夹 // chunkFileNames: (chunkInfo) => { //     const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/') : []; //     const fileName = facadeModuleId[facadeModuleId.length - 2] || '[name]'; //     return `js/${fileName}/[name].[hash].js`; // },
      },
    },
  },
});
