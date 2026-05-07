export const lesson = {
    id: "resolve-alias",
    level: "核心",
    title: "Resolve：模块解析与路径别名",
    summary: "理解 webpack 如何把 import 路径解析到真实文件。",
    details: [
      "resolve 决定 webpack 遇到 import 时如何找文件。相对路径会从当前文件出发解析，包名会从 node_modules 查找，extensions 可以让你省略文件扩展名。",
      "alias 常用来减少深层相对路径，例如把 @ 指向 src。它能改善可读性，但也会引入一套新的路径约定，团队需要保持 webpack、编辑器、测试工具和 TypeScript 配置一致。",
      "mainFields 会影响从 package.json 选择哪个入口。浏览器项目通常会优先 browser、module、main；Node 项目则更接近 main 或 exports 的语义。",
      "解析配置越灵活，越要注意边界。过多 extensions 或过宽 alias 可能让导入来源不清楚，也可能隐藏大小写、路径冲突和跨平台问题。"
    ],
    keyPoints: [
      "extensions 允许省略扩展名",
      "alias 可以缩短深层路径",
      "modules 控制模块查找目录",
      "mainFields 影响包入口选择",
      "路径别名需要工具链一致",
      "解析规则过宽会制造隐患"
    ],
    examples: [
      {
        title: "配置 extensions 与 alias",
        language: "js",
        code: `export default {
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  }
};`
      },
      {
        title: "使用路径别名导入模块",
        language: "js",
        code: `import { lessons } from "@/data/lessons.js";
import { saveProgress } from "@/utils/storage.js";`
      }
    ],
    review: [
      "resolve.extensions 解决什么问题？",
      "路径 alias 为什么需要和编辑器、测试工具保持一致？",
      "alias 使用过多可能带来什么问题？"
    ],
    reviewAnswers: [
      "extensions 让 webpack 在 import './App' 时依次尝试 .js、.json 等扩展名，减少书写成本。但扩展名列表越多，解析越不直观，也可能带来同名文件冲突。",
      "webpack 知道 alias 不代表编辑器、TypeScript、测试运行器都知道。配置不一致时，构建可能能过，但编辑器跳转、类型检查或测试会失败。",
      "过多 alias 会让模块来源不清楚，也会增加迁移和工具配置成本。alias 最适合少量稳定的根路径，而不是替代正常目录设计。"
    ]
  };
