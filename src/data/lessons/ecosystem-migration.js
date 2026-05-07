export const lesson = {
    id: "ecosystem-migration",
    level: "拓展",
    title: "生态对比与迁移判断",
    summary: "理解 webpack、Vite、Rspack、esbuild 等工具的取舍，而不是盲目迁移。",
    details: [
      "webpack 的优势是成熟、可扩展、生态深、兼容复杂项目。它适合历史包袱较多、插件链复杂、多入口、微前端或需要精细构建控制的项目。",
      "Vite 的开发体验来自原生 ESM dev server 和快速预构建，生产构建通常基于 Rollup。它适合现代浏览器目标、应用结构清晰、希望获得更快本地启动的项目。",
      "Rspack 追求和 webpack 生态兼容，同时用 Rust 实现更快构建。它对大型 webpack 项目很有吸引力，但迁移仍要验证 loader、plugin、边缘配置和产物差异。",
      "迁移判断不能只看工具热度。应该先确认痛点是启动慢、热更新慢、生产构建慢、配置难维护还是产物体积大，再选择升级 webpack 配置、替换局部工具或迁移构建系统。"
    ],
    keyPoints: [
      "webpack 成熟且扩展能力强",
      "Vite 强调现代开发体验",
      "Rspack 强调 webpack 兼容和速度",
      "esbuild 常用于快速转译和打包",
      "迁移前要明确真实痛点",
      "迁移需要验证产物和插件兼容"
    ],
    examples: [
      {
        title: "迁移前列出构建能力清单",
        language: "json",
        code: `{
  "currentBuildNeeds": [
    "multi-page entries",
    "css extraction",
    "asset hashing",
    "legacy browser transforms",
    "custom webpack plugin",
    "module federation"
  ]
}`
      },
      {
        title: "先把质量检查独立出来",
        language: "json",
        code: `{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "build": "webpack --mode production"
  }
}`
      }
    ],
    review: [
      "为什么不能只因为 Vite 更快就立刻迁移？",
      "webpack 在复杂项目中还有哪些优势？",
      "Rspack 迁移为什么仍然需要验证？",
      "迁移前应该先明确哪些痛点？"
    ],
    reviewAnswers: [
      "工具速度只是一个维度。还要看插件生态、历史配置、浏览器目标、多页结构、微前端、测试部署流程和团队熟悉度。",
      "它有成熟插件生态、细粒度优化能力、复杂 loader/plugin 组合、多入口支持、Module Federation 和大量历史项目经验。",
      "兼容 webpack 不等于所有边缘配置完全一致。自定义插件、特殊 loader、产物命名、source map、CSS 行为都需要回归验证。",
      "应明确是本地启动慢、HMR 慢、生产构建慢、配置难维护、体积过大，还是团队协作成本高。不同痛点对应不同方案。"
    ]
  };
