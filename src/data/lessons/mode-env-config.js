export const lesson = {
    id: "mode-env-config",
    level: "核心",
    title: "Mode、Env 与配置拆分",
    summary: "理解 development / production 差异，并学会按环境组织 webpack 配置。",
    details: [
      "mode 是 webpack 最重要的高层开关之一。development 会偏向调试体验，例如更快的构建和更适合开发的 source map；production 会启用压缩、tree shaking 等优化，偏向体积和运行效率。",
      "配置文件可以导出对象，也可以导出函数。导出函数时 webpack 会传入 env 和 argv，你可以根据 argv.mode 或自定义 env 参数决定是否抽取 CSS、是否生成 source map、是否启用分析工具。",
      "小项目用一个 webpack.config.js 足够；项目复杂后可以拆成 common、development、production 三份配置，再用 webpack-merge 合并。拆分的目标不是显得高级，而是把不同环境的差异放在清楚的位置。",
      "环境变量要区分构建时和运行时。webpack 配置运行在 Node.js 中，能读取 process.env；浏览器里的代码不能直接读取服务器环境变量，必须通过 DefinePlugin 等方式在构建时显式注入。"
    ],
    keyPoints: [
      "mode 会改变 webpack 默认优化",
      "配置函数可以读取 env 和 argv",
      "开发配置关注速度和调试",
      "生产配置关注体积和缓存",
      "复杂项目可以拆分配置",
      "构建时变量不等于运行时变量"
    ],
    examples: [
      {
        title: "根据 mode 切换配置",
        language: "js",
        code: `export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: argv.mode,
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    output: {
      filename: isProduction ? "assets/[name].[contenthash:8].js" : "assets/[name].js"
    }
  };
};`
      },
      {
        title: "通过 env 打开分析配置",
        language: "js",
        code: `export default (env) => ({
  plugins: [
    env.analyze ? new BundleAnalyzerPlugin() : false
  ].filter(Boolean)
});`
      }
    ],
    review: [
      "mode: development 和 mode: production 的关注点有什么不同？",
      "为什么配置函数比静态对象更适合复杂项目？",
      "构建时变量和运行时变量有什么区别？",
      "哪些配置更适合只在 production 模式下开启？"
    ],
    reviewAnswers: [
      "development 更关注构建速度、调试信息和开发反馈；production 更关注压缩、tree shaking、缓存文件名和最终体积。两者服务的目标不同，所以配置也应该不同。",
      "配置函数可以读取 argv.mode、env 参数和 process.env，从而按环境返回不同配置。复杂项目里很多设置只应该在某个环境启用，用函数表达会更清晰。",
      "构建时变量在 webpack 执行时就确定，并可能被写进最终 JS；运行时变量是在应用运行时由服务器或浏览器环境提供。前端代码不能安全地读取服务器 secret，注入变量时必须非常克制。",
      "压缩、contenthash 文件名、CSS 抽取、bundle 分析、较完整的 tree shaking 等通常更适合 production。开发模式则优先保留构建速度和调试体验。"
    ]
  };
