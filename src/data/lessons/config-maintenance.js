export const lesson = {
    id: "config-maintenance",
    level: "工程",
    title: "配置可维护性",
    summary: "在项目变大后组织 webpack 配置，避免配置文件变成难以维护的杂物间。",
    details: [
      "小项目可以把配置写在一个 webpack.config.js 中。项目变大后，开发、生产、分析、多页、测试构建可能需要不同组合，单文件会越来越难读。",
      "常见做法是拆出公共配置，再按环境组合。公共配置放 entry、resolve、基础 loader；开发配置放 devtool、devServer、style-loader；生产配置放压缩、hash、CSS 抽取和缓存策略。",
      "配置拆分不是越碎越好。每个拆分文件都应该代表稳定边界，例如环境、目标平台或功能开关。过度抽象会让查配置变成跳转游戏。",
      "可维护配置还需要命名清楚、默认值克制、注释少而关键。团队应能从 npm scripts 反推出每个构建命令使用了哪组配置。"
    ],
    keyPoints: [
      "配置增长后需要组织边界",
      "公共配置承载稳定规则",
      "环境配置承载差异策略",
      "拆分不是越碎越好",
      "npm scripts 应表达构建意图",
      "注释应解释关键取舍"
    ],
    examples: [
      {
        title: "按公共配置和环境配置拆分",
        language: "js",
        code: `// webpack.common.js
export const commonConfig = {
  entry: "./src/index.js",
  resolve: {
    extensions: [".js", ".json"]
  }
};

// webpack.prod.js
import { commonConfig } from "./webpack.common.js";

export default {
  ...commonConfig,
  mode: "production",
  output: {
    filename: "assets/js/[name].[contenthash:8].js"
  }
};`
      },
      {
        title: "用脚本暴露构建意图",
        language: "json",
        code: `{
  "scripts": {
    "dev": "webpack serve --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
    "build:analyze": "webpack --config webpack.analyze.js"
  }
}`
      }
    ],
    review: [
      "什么时候应该拆分 webpack 配置？",
      "公共配置通常适合放哪些内容？",
      "配置拆得过碎有什么问题？",
      "为什么 npm scripts 对配置可维护性也重要？"
    ],
    reviewAnswers: [
      "当开发、生产、分析、部署目标之间差异明显，单文件充满条件判断并难以阅读时，就应该考虑拆分。",
      "适合放稳定且多环境共享的内容，例如 entry、resolve、基础 module rules、通用插件和项目路径常量。",
      "过度拆分会让配置来源分散，阅读者需要在多个文件之间跳转，反而更难理解最终配置。",
      "脚本是团队调用构建的入口。清楚的脚本名能表达构建目标，也能避免每个人手动拼不同参数。"
    ]
  };
