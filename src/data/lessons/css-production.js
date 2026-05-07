export const lesson = {
    id: "css-production",
    level: "工程",
    title: "CSS 生产优化",
    summary: "把开发阶段的样式注入切换成可缓存、可压缩的生产 CSS 资源。",
    details: [
      "开发环境常用 style-loader，因为它能快速把 CSS 注入页面并配合 HMR。生产环境通常更适合抽取独立 CSS 文件，让浏览器并行加载和长期缓存样式资源。",
      "MiniCssExtractPlugin 会把 CSS 从 JS 中抽离成文件。配合 contenthash，样式没变时文件名稳定，浏览器可以继续命中缓存。",
      "CSS 还需要压缩和顺序管理。压缩能减少传输体积；顺序问题则来自多个入口或组件之间的 import 顺序不一致，严重时会导致样式覆盖结果不稳定。",
      "首屏体验也要考虑 CSS 加载方式。把全部样式塞进 JS 可能延迟渲染，把关键 CSS 拆得太碎又可能增加请求成本。生产策略应该结合页面规模、缓存收益和渲染路径选择。"
    ],
    keyPoints: [
      "开发环境偏向 style-loader",
      "生产环境常抽取独立 CSS",
      "CSS 文件适合 contenthash 缓存",
      "CSS 压缩减少传输体积",
      "样式 import 顺序会影响覆盖结果",
      "CSS 拆分要兼顾首屏和缓存"
    ],
    examples: [
      {
        title: "生产环境抽取 CSS 文件",
        language: "js",
        code: `import MiniCssExtractPlugin from "mini-css-extract-plugin";

export default {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css"
    })
  ]
};`
      },
      {
        title: "按环境切换 CSS loader",
        language: "js",
        code: `const isProduction = process.env.NODE_ENV === "production";

export default {
  module: {
    rules: [
      {
        test: /\\.css$/,
        use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
      }
    ]
  }
};`
      }
    ],
    review: [
      "为什么生产环境通常不继续使用 style-loader？",
      "MiniCssExtractPlugin 和 contenthash 组合有什么缓存收益？",
      "CSS import 顺序为什么可能影响最终样式？",
      "CSS 拆分过细可能带来什么问题？"
    ],
    reviewAnswers: [
      "style-loader 会通过 JS 把样式注入页面，更适合开发热更新。生产环境通常希望 CSS 独立加载、独立缓存，并减少 JS 执行路径里的样式工作。",
      "CSS 内容不变时 contenthash 文件名不变，浏览器可以继续使用缓存。内容变化时文件名变化，用户会请求新样式文件。",
      "CSS 的覆盖依赖加载顺序和选择器权重。多个入口或组件以不同顺序引入样式时，最终打包顺序可能改变覆盖结果。",
      "请求数量会增加，首屏可能等待多个 CSS 文件；同时拆分策略太复杂会让缓存和加载顺序更难管理。"
    ]
  };
