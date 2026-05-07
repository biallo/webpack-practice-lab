export const lesson = {
    id: "loaders",
    level: "核心",
    title: "Loaders：处理 CSS 和资源",
    summary: "使用 loader 让 webpack 认识浏览器原生不直接处理的模块类型。",
    details: [
      "loader 是 webpack 的模块转换管线。当你 import './styles.css' 时，浏览器并不知道 JavaScript 里为什么能导入 CSS；是 css-loader 先把 CSS 解析成模块，再由 style-loader 或 MiniCssExtractPlugin.loader 决定如何把 CSS 放进页面。",
      "loader 的执行顺序是从右到左、从下到上。use: ['style-loader', 'css-loader'] 代表 css-loader 先运行，style-loader 后运行。这个顺序非常重要，尤其是 Sass、PostCSS、Babel 等链式转换。",
      "开发环境常用 style-loader，因为它能把样式注入到 style 标签，并配合热更新快速反馈。生产环境更常用 MiniCssExtractPlugin，它会输出独立 CSS 文件，让浏览器并行下载和缓存样式。",
      "webpack 5 内置 Asset Modules，可以用 asset/resource、asset/inline、asset/source 和 asset 自动处理图片、字体、SVG、ICO 等资源。"
    ],
    keyPoints: [
      "loader 让非 JS 资源进入依赖图",
      "loader 链从右往左执行",
      "css-loader 解析 CSS import/url",
      "style-loader 适合开发热更新",
      "MiniCssExtractPlugin 适合生产抽取",
      "Asset Modules 取代许多旧资源 loader"
    ],
    examples: [
      {
        title: "开发与生产环境切换 CSS 处理方式",
        language: "js",
        code: `const isProduction = argv.mode === "production";

export default {
  module: {
    rules: [
      {
        test: /\\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader"
        ]
      }
    ]
  }
};`
      },
      {
        title: "使用 asset/resource 输出图片资源",
        language: "js",
        code: `export default {
  module: {
    rules: [
      {
        test: /\\.(png|jpe?g|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[contenthash:8][ext]"
        }
      }
    ]
  }
};`
      }
    ],
    review: [
      "为什么 loader 链的顺序会影响构建结果？",
      "开发环境使用 style-loader 的优势是什么？",
      "Asset Modules 能解决哪些静态资源处理问题？",
      "生产环境为什么常用 MiniCssExtractPlugin 替代 style-loader？"
    ],
    reviewAnswers: [
      "webpack 的 loader 链从右到左执行。比如 use: ['style-loader', 'css-loader'] 会先用 css-loader 解析 CSS，再用 style-loader 注入页面。如果顺序反了，后一个 loader 收到的内容类型就可能不符合预期。",
      "style-loader 会把 CSS 注入到页面的 style 标签中，配合 webpack-dev-server 可以快速热更新样式，不需要每次都抽取独立 CSS 文件。它适合开发反馈，不适合作为生产缓存策略。",
      "Asset Modules 可以把图片、字体、SVG、ICO 等资源纳入依赖图，并根据配置输出文件、内联 base64 或返回源码文本。webpack 5 以后很多过去依赖 file-loader、url-loader 的场景都可以用内置 Asset Modules 解决。",
      "生产环境更看重缓存、并行加载和首屏资源控制。抽取独立 CSS 文件后，浏览器可以缓存 CSS，也能避免把所有样式都塞进 JS 执行流程。"
    ]
  };
