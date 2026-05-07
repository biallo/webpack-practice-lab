export const lesson = {
    id: "dev-server-hmr",
    level: "开发",
    title: "Dev Server 与 HMR",
    summary: "理解开发服务器、静态目录、热更新和本地代理。",
    details: [
      "webpack-dev-server 会在内存中构建产物并通过本地 HTTP 服务提供页面。开发时你看到的资源不一定写入 dist，这也是为什么不能把 dev server 当成生产部署方案。",
      "HMR 的目标是在不刷新整个页面的情况下替换更新模块。CSS 热更新通常体验很好，JavaScript HMR 需要应用代码或框架配合处理状态更新，否则仍可能退回整页刷新。",
      "static 配置用于提供不进入依赖图的静态文件，例如 public 目录。historyApiFallback 常用于前端路由，让刷新 /settings 这类路径时仍返回 index.html。",
      "proxy 可以把本地前端请求转发到后端服务，避免开发阶段跨域问题。但它只是开发便利，生产环境通常由网关、反向代理或同源部署处理。"
    ],
    keyPoints: [
      "dev server 产物通常存在内存中",
      "HMR 替换模块而不是完整刷新",
      "static 提供 public 静态目录",
      "historyApiFallback 支持前端路由",
      "proxy 解决本地 API 转发",
      "dev server 不等于生产服务器"
    ],
    examples: [
      {
        title: "常见 devServer 配置",
        language: "js",
        code: `export default {
  devServer: {
    hot: true,
    port: 8080,
    static: {
      directory: path.resolve(__dirname, "public")
    },
    historyApiFallback: true,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000"
      }
    ]
  }
};`
      }
    ],
    review: [
      "为什么 dev server 的产物不适合直接部署？",
      "HMR 和整页刷新有什么差异？",
      "proxy 在开发环境解决了什么问题？",
      "为什么开发服务器常把构建结果放在内存里？"
    ],
    reviewAnswers: [
      "dev server 面向开发体验，产物常在内存中，还带有 HMR 客户端和开发 source map。生产部署需要 npm run build 生成稳定的 dist，再交给静态服务或部署平台。",
      "整页刷新会重新加载整个应用并丢失页面状态；HMR 尝试只替换变更模块，让页面保持当前状态。CSS HMR 通常天然有效，JS HMR 则需要框架或代码处理更新边界。",
      "proxy 可以把 /api 请求转发到本地后端，避免浏览器跨域限制，也让前端代码保持类似生产的相对路径请求。",
      "内存构建省去了频繁写磁盘的成本，能让增量编译和热更新更快。它服务的是开发反馈，不是可部署产物。"
    ]
  };
