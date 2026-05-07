export const lesson = {
    id: "externals-cdn",
    level: "优化",
    title: "externals 与 CDN",
    summary: "把部分依赖排除出 bundle，并通过 CDN 或宿主环境提供。",
    details: [
      "externals 告诉 webpack 某些依赖不要打进 bundle，而是在运行时从外部环境获取。常见场景是 React、Vue、lodash 等由 CDN script 提供全局变量。",
      "这样做可以降低应用 bundle 体积，并利用 CDN 或多个应用之间的共享缓存。但它也把依赖加载、版本管理和失败处理从 webpack 转移到了页面运行环境。",
      "externals 需要确保构建时 import 名称和运行时全局变量对应。比如 import React from \"react\" 可以映射到 window.React，映射错了会在运行时报错。",
      "不是所有依赖都适合外部化。频繁变化、体积很小、只被单个页面使用、或必须参与 tree shaking 的模块，通常继续打包更简单。"
    ],
    keyPoints: [
      "externals 会排除依赖打包",
      "CDN 可降低应用 bundle 体积",
      "外部依赖需要运行时提前加载",
      "版本一致性需要额外管理",
      "全局变量映射必须正确",
      "不是所有依赖都适合外部化"
    ],
    examples: [
      {
        title: "把 React 映射到 CDN 全局变量",
        language: "js",
        code: `export default {
  externals: {
    react: "React",
    "react-dom": "ReactDOM"
  }
};`
      },
      {
        title: "HTML 中提供外部依赖",
        language: "html",
        code: `<script src="https://cdn.example.com/react.production.min.js"></script>
<script src="https://cdn.example.com/react-dom.production.min.js"></script>
<script src="assets/js/app.js"></script>`
      }
    ],
    review: [
      "externals 的作用是什么？",
      "把依赖放到 CDN 有哪些收益？",
      "externals 带来了哪些运行时风险？",
      "什么类型的依赖不一定适合 external？"
    ],
    reviewAnswers: [
      "它让 webpack 在遇到指定依赖时不把它打进 bundle，而是假设运行时环境已经提供了这个模块或全局变量。",
      "可以减少应用 bundle 体积，利用 CDN 缓存和多个应用之间的共享缓存，也能把大型框架依赖和业务代码分开发布。",
      "CDN 加载失败、版本不匹配、全局变量名写错、加载顺序错误都会导致运行时问题。这些问题不再由 webpack 打包阶段完全兜底。",
      "体积很小、变化频繁、依赖 tree shaking、只在少数路径使用或和业务代码版本强绑定的模块，继续打进 bundle 往往更稳。"
    ]
  };
