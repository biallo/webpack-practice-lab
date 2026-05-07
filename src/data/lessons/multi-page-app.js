export const lesson = {
    id: "multi-page-app",
    level: "进阶",
    title: "多入口与多页应用",
    summary: "用多个 entry 和 HtmlWebpackPlugin 管理传统多页站点或后台页面。",
    details: [
      "webpack 不只服务单页应用。多页应用可以为每个页面配置独立 entry，再用多个 HtmlWebpackPlugin 实例生成对应 HTML，让登录页、管理页、报表页拥有各自的入口资源。",
      "多入口项目最重要的是控制资源注入。每个 HTML 应只注入自己需要的入口 chunk 和公共 chunk，避免登录页加载后台完整代码，也避免页面之间互相污染。",
      "公共依赖仍然可以通过 splitChunks 抽取。多个页面共享 React、工具库或设计系统时，合理拆出 common/vendor chunk 可以减少重复打包，但也要注意请求数量和缓存策略。",
      "MPA 更接近服务端路由或传统静态页面模型，适合活动页、后台多模块、低耦合页面集合。它和 SPA 没有绝对优劣，关键是看页面之间是否需要共享运行时状态和路由体验。"
    ],
    keyPoints: [
      "多入口适合多页站点",
      "每个页面可以有独立 entry",
      "HtmlWebpackPlugin 可生成多个 HTML",
      "chunks 控制页面注入资源",
      "splitChunks 可抽取公共依赖",
      "MPA 和 SPA 适合不同产品结构"
    ],
    examples: [
      {
        title: "为多个页面配置入口和 HTML",
        language: "js",
        code: `import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  entry: {
    home: "./src/pages/home.js",
    admin: "./src/pages/admin.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/home.html",
      chunks: ["home"]
    }),
    new HtmlWebpackPlugin({
      filename: "admin.html",
      template: "./public/admin.html",
      chunks: ["admin"]
    })
  ]
};`
      },
      {
        title: "抽取多页共享依赖",
        language: "js",
        code: `export default {
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
};`
      }
    ],
    review: [
      "多入口项目为什么通常需要多个 HtmlWebpackPlugin 实例？",
      "HtmlWebpackPlugin 的 chunks 配置解决什么问题？",
      "MPA 中抽取公共 chunk 有什么收益和风险？",
      "什么时候多页应用比单页应用更合适？"
    ],
    reviewAnswers: [
      "每个页面通常需要独立 HTML，并注入不同入口文件。多个 HtmlWebpackPlugin 实例可以分别生成 index.html、admin.html 等页面。",
      "chunks 可以限制某个 HTML 只注入指定入口和相关 chunk，避免页面加载不属于自己的代码。",
      "收益是减少重复打包并提升共享依赖缓存命中；风险是公共 chunk 过大或页面依赖关系复杂，导致低频页面也加载过多公共代码。",
      "页面之间耦合弱、路由由服务端或静态路径管理、每页功能差异大时，MPA 更简单。需要连续应用状态和复杂前端路由时，SPA 往往更合适。"
    ]
  };
