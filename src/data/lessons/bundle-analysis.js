export const lesson = {
    id: "bundle-analysis",
    level: "优化",
    title: "性能分析与产物体积",
    summary: "学会从 stats 和 bundle 分析中判断真正的体积问题。",
    details: [
      "优化前先测量。webpack 的 stats 信息能告诉你入口、chunk、module 和 asset 的体积，分析工具则能把 bundle 里每个依赖的占比可视化。",
      "体积问题常见来源包括重复依赖、一次性引入大库、moment 这类带大量 locale 的包、把编辑器或图表库放进首屏、vendor chunk 过大等。",
      "优化手段包括按需导入、动态导入、替换更轻的库、确认 tree shaking 生效、拆分低频功能、开启压缩和合理缓存。不要为了数字好看牺牲用户真实交互路径。",
      "性能分析要区分构建体积、传输体积和执行成本。gzip 后小不代表解析执行便宜，大量 JavaScript 仍会占用主线程。"
    ],
    keyPoints: [
      "优化前先测量",
      "stats 能暴露模块体积",
      "分析工具能定位大依赖",
      "首屏不该包含低频功能",
      "传输体积不等于执行成本",
      "优化要围绕真实用户路径"
    ],
    examples: [
      {
        title: "输出 stats 文件用于分析",
        language: "json",
        code: `{
  "scripts": {
    "build:stats": "webpack --mode production --json > stats.json"
  }
}`
      },
      {
        title: "低频功能改成按需加载",
        language: "js",
        code: `async function openEditor() {
  const { mountEditor } = await import("./editor.js");
  mountEditor(document.querySelector("#editor"));
}`
      }
    ],
    review: [
      "为什么优化前要先看 stats 或 bundle 分析？",
      "传输体积和执行成本有什么区别？",
      "哪些功能适合从首屏 bundle 中拆出去？",
      "看到一个大依赖时，为什么不能立刻下结论要删掉它？"
    ],
    reviewAnswers: [
      "没有测量就容易凭感觉优化，可能改了不重要的地方。stats 和分析图能告诉你真正的大模块、重复依赖和 chunk 分布。",
      "传输体积是网络下载大小，通常受 gzip/brotli 影响；执行成本是浏览器解析、编译和运行 JavaScript 的时间。下载小的代码如果逻辑复杂，也可能阻塞主线程。",
      "用户不一定立即使用、体积较大、独立性强的功能适合拆出去，例如编辑器、图表、设置面板、管理后台页面、导入导出工具等。",
      "还要看它是否在首屏路径、是否可按需加载、是否已有缓存、是否能替换为更小 API、以及它的执行成本。体积大不一定就是当前性能瓶颈。"
    ]
  };
