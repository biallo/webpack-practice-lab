export const lesson = {
    id: "plugins",
    level: "进阶",
    title: "Plugins：扩展构建流程",
    summary: "用插件生成 HTML、抽取 CSS、复制静态资源。",
    details: [
      "plugin 面向整个构建生命周期。loader 处理的是某一种模块如何转换，plugin 处理的是构建过程中的更大动作，例如生成 HTML、抽取 CSS、复制文件、注入环境变量、分析 bundle 体积。",
      "HtmlWebpackPlugin 会根据模板生成最终 index.html，并自动插入构建后的 script 和 link 标签。这样文件名带 contenthash 时，HTML 仍然能引用正确产物，不需要手动维护。",
      "CopyWebpackPlugin 适合复制不经过模块 import 的静态文件，例如 favicon、PWA manifest、robots.txt 或第三方验证文件。这个项目把从 webpack 官网获取的 favicon 和移动端 icons 放在 public/icons，再复制到 dist/icons。",
      "MiniCssExtractPlugin 既提供 loader，也提供 plugin。loader 负责在模块转换阶段收集 CSS，plugin 负责在构建结束阶段生成独立 CSS 文件。这类插件很好地体现了 loader 与 plugin 的协作边界。"
    ],
    keyPoints: [
      "plugin 介入 webpack 构建生命周期",
      "HtmlWebpackPlugin 生成 HTML 并注入资源",
      "CopyWebpackPlugin 复制静态文件",
      "MiniCssExtractPlugin 输出独立 CSS",
      "loader 转换模块，plugin 协调整体构建",
      "插件顺序会影响部分高级场景"
    ],
    examples: [
      {
        title: "用插件生成 HTML、CSS 和静态资源",
        language: "js",
        code: `export default {
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].[contenthash:8].css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public/icons", to: "icons" },
        { from: "public/site.webmanifest", to: "site.webmanifest" }
      ]
    })
  ]
};`
      },
      {
        title: "HTML 模板中保留应用根节点和图标声明",
        language: "html",
        code: `<link rel="icon" type="image/x-icon" href="icons/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" />
<link rel="manifest" href="site.webmanifest" />
<div id="root"></div>`
      }
    ],
    review: [
      "loader 和 plugin 最关键的职责差异是什么？",
      "为什么 hash 文件名需要 HtmlWebpackPlugin 自动注入？",
      "哪些资源适合用 CopyWebpackPlugin 复制？",
      "为什么 plugin 更适合处理跨模块或产物级任务？"
    ],
    reviewAnswers: [
      "loader 面向单个模块的转换，例如把 CSS、图片、Sass、TypeScript 转成 webpack 能理解的模块；plugin 面向整个构建生命周期，例如生成 HTML、复制静态文件、抽取 CSS、分析产物。简单说，loader 处理文件，plugin 编排构建。",
      "生产环境文件名通常带 contenthash，每次内容变化都会生成新名字。HtmlWebpackPlugin 能读取本次构建的真实产物名并自动注入 script/link，避免手动维护 HTML 中的 hash 文件名。",
      "不需要通过 import 进入依赖图、但部署时必须原样存在的文件适合复制，例如 favicon、PWA manifest、robots.txt、第三方平台验证文件、静态下载文件等。",
      "跨模块统计、HTML 生成、CSS 抽取、资源复制、分析报告等都需要理解整个构建过程或最终产物。loader 只处理匹配到的模块，plugin 才能介入更广的生命周期。"
    ]
  };
