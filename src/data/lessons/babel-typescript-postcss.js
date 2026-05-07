export const lesson = {
    id: "babel-typescript-postcss",
    level: "工程",
    title: "Babel、TypeScript 与 PostCSS",
    summary: "把语言转换和工程化工具接入 webpack loader 管线。",
    details: [
      "webpack 不等于 Babel，也不等于 TypeScript 编译器。webpack 负责依赖图和打包，Babel、ts-loader、swc-loader、postcss-loader 等工具负责把源码转换成目标浏览器能运行的形态。",
      "Babel 常用于转换 JavaScript 语法和注入必要插件。TypeScript 项目可以用 ts-loader 做类型相关编译，也可以用 babel-loader 或 swc-loader 只做转译，再把类型检查交给 tsc --noEmit。",
      "PostCSS 是 CSS 转换平台，常见用途是 Autoprefixer、未来 CSS 语法降级、CSS nesting 等。它通常排在 css-loader 之前执行，先处理 CSS 语法，再交给 webpack 解析 import 和 url。",
      "要警惕把所有事情都塞进 loader。类型检查、lint、格式化、测试通常更适合独立命令或 CI 阶段，webpack 构建只承担和产物生成强相关的工作。"
    ],
    keyPoints: [
      "webpack 负责打包，不负责所有语法转换",
      "Babel 处理 JavaScript 转译",
      "TypeScript 可分离转译与类型检查",
      "PostCSS 处理 CSS 工程化转换",
      "loader 顺序决定转换管线",
      "类型检查可以独立于 webpack"
    ],
    examples: [
      {
        title: "接入 Babel loader",
        language: "js",
        code: `export default {
  module: {
    rules: [
      {
        test: /\\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]]
          }
        }
      }
    ]
  }
};`
      },
      {
        title: "TypeScript 类型检查单独运行",
        language: "json",
        code: `{
  "scripts": {
    "build": "webpack --mode production",
    "typecheck": "tsc --noEmit"
  }
}`
      }
    ],
    review: [
      "webpack 和 Babel 的职责有什么区别？",
      "为什么很多项目把 TypeScript 类型检查从 webpack 构建里拆出去？",
      "PostCSS 通常解决什么问题？",
      "babel-loader、ts-loader、swc-loader 的取舍应该看哪些因素？",
      "为什么类型检查、lint、测试不一定适合都塞进 webpack loader？"
    ],
    reviewAnswers: [
      "webpack 负责收集模块、处理依赖图并输出 bundle；Babel 负责把 JavaScript 语法转换成目标环境可运行的代码。两者可以配合，但不是同一个工具。",
      "类型检查可能比较慢，也不一定需要阻塞每次本地热更新。把转译和类型检查拆开，可以让开发构建更快，同时在 CI 或单独命令里保证类型安全。",
      "PostCSS 用插件处理 CSS，例如自动添加浏览器前缀、转换新 CSS 语法、处理嵌套规则等。它让 CSS 也能进入可配置的工程化转换流程。",
      "主要看团队是否需要 Babel 插件生态、TypeScript 类型相关编译、构建速度、目标浏览器兼容和错误诊断体验。大型项目常把“快速转译”和“独立类型检查”拆开处理。",
      "这些任务可能很慢，且不一定参与产物生成。把它们放进独立命令或 CI，可以保持本地构建反馈更快，也让失败原因更清楚。"
    ]
  };
