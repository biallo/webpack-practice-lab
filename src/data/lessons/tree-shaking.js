export const lesson = {
    id: "tree-shaking",
    level: "优化",
    title: "Tree Shaking 与 sideEffects",
    summary: "理解 webpack 如何移除未使用代码，以及 sideEffects 的风险。",
    details: [
      "tree shaking 的目标是删除没有被使用的导出。它依赖静态分析，因此 ESM 的 import/export 比动态 require 更容易被分析。",
      "usedExports 会标记哪些导出被使用，minimizer 会在生产压缩阶段真正删除无用代码。也就是说，tree shaking 通常要在 production mode 下观察才准确。",
      "package.json 的 sideEffects 字段告诉 webpack 哪些模块可以被认为没有副作用。sideEffects: false 很强，但如果你的模块 import 了全局 CSS、注册了 polyfill 或修改了全局对象，错误声明会导致必要代码被删掉。",
      "tree shaking 不是万能瘦身术。动态访问、运行时条件、CommonJS 包、带副作用的模块都会限制删除效果。优化体积时要结合 bundle 分析看真实结果。"
    ],
    keyPoints: [
      "ESM 更利于静态分析",
      "production mode 才能看到完整删除效果",
      "usedExports 标记使用情况",
      "压缩器负责删除无用代码",
      "sideEffects:false 需要谨慎",
      "CSS 和 polyfill 常带副作用"
    ],
    examples: [
      {
        title: "声明无副作用模块",
        language: "json",
        code: `{
  "sideEffects": [
    "*.css",
    "./src/polyfills.js"
  ]
}`
      },
      {
        title: "优先使用可静态分析的导入",
        language: "js",
        code: `import { debounce } from "./utils.js";

debounce(() => {
  console.log("search");
}, 200);`
      }
    ],
    review: [
      "为什么 ESM 更适合 tree shaking？",
      "sideEffects:false 为什么可能危险？",
      "为什么开发环境里观察 tree shaking 容易误判？",
      "usedExports 和压缩器在 tree shaking 中分别做什么？",
      "哪些代码模式会限制 tree shaking 效果？"
    ],
    reviewAnswers: [
      "ESM 的 import/export 结构是静态的，webpack 能在构建阶段判断哪些导出被引用。CommonJS 的 require 和 module.exports 更动态，很多情况只能保守处理。",
      "如果模块有全局副作用，例如引入 CSS、注册 polyfill、修改全局对象，却被声明为无副作用，webpack 可能把它删除，导致运行时样式或功能丢失。",
      "开发环境通常为了速度和可调试性不会完整压缩删除无用代码。tree shaking 的最终效果通常要看 production build 和实际产物分析。",
      "usedExports 负责标记哪些导出被使用，压缩器在生产压缩阶段根据这些标记真正删除无用代码。只看标记不等于最终产物已经变小。",
      "动态访问导出、CommonJS 包、运行时条件、带副作用的模块、过于宽泛的入口导入都可能让 webpack 必须保守处理，导致代码不能被安全删除。"
    ]
  };
