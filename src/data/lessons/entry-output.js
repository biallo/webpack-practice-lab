export const lesson = {
    id: "entry-output",
    level: "核心",
    title: "Entry、Output 与依赖图",
    summary: "从入口出发理解模块依赖如何被打包到 dist。",
    details: [
      "entry 是构建的起点。单页应用通常只有一个 app 入口，多页应用可以声明多个入口。每个入口都会成为一个 chunk group，webpack 会沿着 import、export、动态导入等语法继续分析依赖。",
      "output 决定构建结果的物理位置和公开访问路径。path 是写入磁盘的位置，filename 是入口 chunk 的命名方式，chunkFilename 是非入口 chunk 的命名方式，publicPath 则影响运行时如何拼接资源 URL。",
      "生产环境常用 contenthash。它根据文件内容生成 hash，内容不变时文件名不变，浏览器缓存可以长期保留；内容改变时文件名改变，用户会请求新文件。这是静态资源缓存策略的基础。",
      "runtimeChunk: single 会把 webpack 运行时单独拆出来。运行时负责模块加载、chunk 映射和动态导入调度。它单独存在时，业务代码和运行时代码的缓存边界更清楚。"
    ],
    keyPoints: [
      "entry 可以是字符串、数组或对象",
      "output.path 必须是绝对路径",
      "filename 控制入口产物",
      "chunkFilename 控制异步 chunk",
      "publicPath 影响资源加载地址",
      "contenthash 服务长期缓存"
    ],
    examples: [
      {
        title: "多入口与带 hash 的输出",
        language: "js",
        code: `export default {
  entry: {
    app: "./src/index.js",
    admin: "./src/admin.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].[contenthash:8].js",
    chunkFilename: "assets/js/[name].[contenthash:8].chunk.js",
    publicPath: ""
  }
};`
      },
      {
        title: "动态导入会生成异步 chunk",
        language: "js",
        code: `async function openSettings() {
  const module = await import("./settings-panel.js");
  module.mountSettingsPanel();
}`
      }
    ],
    review: [
      "filename 和 chunkFilename 的区别是什么？",
      "contenthash 为什么比固定文件名更适合生产环境？",
      "publicPath 设置为空字符串为什么适合子路径部署？",
      "动态导入为什么会影响 output.chunkFilename？"
    ],
    reviewAnswers: [
      "filename 控制入口 chunk 的文件名，例如 app 入口打出来的主文件；chunkFilename 控制非入口 chunk 的文件名，例如 dynamic import 产生的异步文件。入口文件在 HTML 中通常会被直接引用，异步 chunk 则由 webpack runtime 在运行时加载。",
      "contenthash 根据文件内容生成。内容不变时文件名不变，浏览器可以继续使用缓存；内容变化时文件名变化，浏览器会请求新资源。固定文件名很容易遇到用户缓存旧文件的问题。",
      "很多静态站点会部署在 /docs/、/app/、/仓库名/ 这类子路径下。publicPath 为空字符串时，JS、CSS、图片等资源会用相对路径加载，页面移动到不同子路径时也更容易保持可用。",
      "dynamic import 会生成非入口异步 chunk，这些文件不是直接写在 HTML 里的入口脚本，而是由 webpack runtime 按需加载，因此会使用 chunkFilename 规则命名。"
    ]
  };
