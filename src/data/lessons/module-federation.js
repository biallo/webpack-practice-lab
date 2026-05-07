export const lesson = {
    id: "module-federation",
    level: "高级",
    title: "Module Federation 微前端",
    summary: "理解 webpack 5 如何在运行时加载其他应用暴露的模块。",
    details: [
      "Module Federation 允许一个 webpack 构建在运行时加载另一个构建暴露的模块。它常用于微前端、插件化系统或多个团队独立发布的页面模块。",
      "remote 应用通过 exposes 暴露模块，host 应用通过 remotes 声明远程地址并 import 远程模块。关键变化是依赖关系从构建时固定，部分转移到运行时协商和加载。",
      "shared 配置用于共享 React、设计系统或工具库等依赖，减少重复加载。但共享依赖会带来版本协商、单例约束和运行时兼容问题。",
      "Module Federation 不是免费午餐。它增加了部署、监控、降级、版本治理和错误隔离成本。只有当独立发布和跨应用复用的收益足够大时，才值得引入。"
    ],
    keyPoints: [
      "Module Federation 支持运行时模块加载",
      "remote 暴露模块",
      "host 消费远程模块",
      "shared 可共享依赖",
      "版本协商是核心风险",
      "微前端需要治理和降级策略"
    ],
    examples: [
      {
        title: "remote 应用暴露模块",
        language: "js",
        code: `import { ModuleFederationPlugin } from "webpack/container";

export default {
  plugins: [
    new ModuleFederationPlugin({
      name: "catalog",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductCard": "./src/ProductCard.js"
      },
      shared: ["react", "react-dom"]
    })
  ]
};`
      },
      {
        title: "host 应用消费远程模块",
        language: "js",
        code: `import { ModuleFederationPlugin } from "webpack/container";

export default {
  plugins: [
    new ModuleFederationPlugin({
      remotes: {
        catalog: "catalog@https://cdn.example.com/catalog/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ]
};

// const ProductCard = await import("catalog/ProductCard");`
      }
    ],
    review: [
      "Module Federation 和普通代码分割有什么本质区别？",
      "host、remote、exposes、remotes 分别表示什么？",
      "shared 依赖为什么既有收益也有风险？",
      "什么情况下不应该轻易引入 Module Federation？"
    ],
    reviewAnswers: [
      "普通代码分割仍在同一个构建内部拆 chunk；Module Federation 可以在运行时加载另一个独立构建暴露的模块，发布边界更大。",
      "host 是消费远程模块的应用；remote 是暴露模块的应用；exposes 声明 remote 暴露哪些模块；remotes 声明 host 去哪里加载远程应用。",
      "收益是减少重复依赖并保持框架实例一致；风险是版本不兼容、单例依赖冲突、远程应用升级影响 host 运行时稳定性。",
      "如果团队规模小、应用边界不清晰、没有独立发布需求、缺少监控和降级能力，引入它可能比单体前端或普通包复用更复杂。"
    ]
  };
