export const lesson = {
    id: "setup",
    level: "入门",
    title: "安装与工程骨架",
    summary: "认识 webpack、webpack-cli、webpack-dev-server，以及项目如何从入口文件启动。",
    details: [
      "webpack 的核心工作是从入口模块开始建立依赖图。入口模块 import 了什么，webpack 就继续追踪什么，直到把应用运行所需的模块、样式、图片和其他资源整理成浏览器可以加载的文件。",
      "webpack 本体负责构建能力，webpack-cli 负责把命令行参数翻译成构建任务，webpack-dev-server 负责开发阶段的本地服务、热更新和内存构建。把这三者拆开理解，会比只记住 npm run dev 更稳定。",
      "现代 webpack 项目通常会把常用命令写进 package.json。dev 面向本地调试，build 面向生产构建，preview 用来检查 dist 产物。这些脚本是团队协作的入口，也是 CI/CD 最适合调用的接口。",
      "这个项目使用 type: module，因此 webpack.config.js 可以用 import/export default。配置函数接收 env 和 argv，常用 argv.mode 判断开发或生产环境，再切换 devtool、CSS 处理方式和文件名策略。"
    ],
    keyPoints: [
      "webpack 从 entry 生成依赖图",
      "webpack-cli 提供命令行入口",
      "webpack-dev-server 服务开发环境",
      "npm scripts 统一团队命令",
      "mode 会影响默认优化行为",
      "ESM 配置适合现代 Node.js 项目"
    ],
    examples: [
      {
        title: "package.json 中固定常用命令",
        language: "json",
        code: `{
  "type": "module",
  "scripts": {
    "dev": "webpack serve --mode development",
    "build": "webpack --mode production",
    "preview": "serve dist"
  },
  "devDependencies": {
    "webpack": "^5.106.2",
    "webpack-cli": "^7.0.2",
    "webpack-dev-server": "^5.2.3"
  }
}`
      },
      {
        title: "最小化 webpack 配置骨架",
        language: "js",
        code: `export default {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js"
  }
};`
      }
    ],
    review: [
      "webpack、webpack-cli、webpack-dev-server 分别解决什么问题？",
      "为什么生产构建不应该依赖 dev server？",
      "把常用命令写进 package.json 有什么协作价值？"
    ],
    reviewAnswers: [
      "webpack 负责根据入口建立依赖图并生成构建产物；webpack-cli 负责提供命令行入口，让你可以用 webpack、webpack serve 等命令启动任务；webpack-dev-server 负责开发服务器、热更新和内存构建。三者组合起来才形成完整的本地开发体验。",
      "dev server 主要面向开发调试，构建结果通常存在内存中，并带有 HMR、开发 source map 等开发能力。生产环境需要稳定、可缓存、可部署的静态产物，应该通过 webpack --mode production 生成 dist 后交给静态服务或部署平台。",
      "npm scripts 把团队常用命令固定成统一入口，避免每个人记不同参数。CI、部署脚本和新人上手都可以调用同一组命令，例如 npm run dev、npm run build、npm run preview。"
    ]
  };
