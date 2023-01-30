export default {
  //打包的文件源路径
  input: "src/main.js",
  //文件输出的配置
  output: {
    // 打包后生产的文件位置，及文件名
    file: "dist/bundle.cjs.js",
    // 文件输出格式
    format: "cjs",
    // 包的全局变量名称
    name: "bundleName",
  },
};
