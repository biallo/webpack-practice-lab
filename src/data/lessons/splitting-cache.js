export const lesson = {
    id: "splitting-cache",
    level: "进阶",
    title: "代码分割与缓存",
    summary: "通过 dynamic import 和 splitChunks 观察 webpack 如何拆包。",
    details: [
      "代码分割的目标不是盲目拆小，而是让首屏只下载必要代码，并让变化频率不同的代码拥有不同缓存周期。webpack 常见拆分来源有多入口、动态导入和 splitChunks 自动拆包。",
      "dynamic import 会返回 Promise，webpack 会把被导入模块放入异步 chunk。用户触发对应功能时，运行时再请求这个 chunk。适合设置页、编辑器、图表、路由页面等不一定立即使用的内容。",
      "splitChunks 会分析多个 chunk 之间共享的模块，并把符合条件的公共依赖提取出来。真实项目常把第三方依赖、公共组件和运行时代码分开，让业务修改不会频繁冲击 vendor 缓存。",
      "缓存策略通常和 output 命名配套：入口文件、异步 chunk、CSS 都使用 contenthash；HTML 不长期缓存，因为 HTML 负责指向最新静态资源；runtime 单独拆分可以减少入口 chunk 中清单变化带来的缓存失效。"
    ],
    keyPoints: [
      "dynamic import 生成异步 chunk",
      "splitChunks 提取共享依赖",
      "runtimeChunk 拆出 webpack 运行时",
      "contenthash 与缓存策略绑定",
      "HTML 应保持可快速更新",
      "拆包要围绕真实加载路径设计"
    ],
    examples: [
      {
        title: "动态导入并命名 chunk",
        language: "js",
        code: `async function loadChart() {
  const { renderChart } = await import(
    /* webpackChunkName: "chart" */ "./chart.js"
  );

  renderChart(document.querySelector("#chart"));
}`
      },
      {
        title: "拆分运行时与共享依赖",
        language: "js",
        code: `export default {
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
    }
  }
};`
      }
    ],
    review: [
      "dynamic import 适合哪些页面或功能？",
      "拆包过细可能带来什么问题？",
      "为什么 HTML 文件通常不做长期强缓存？",
      "runtimeChunk: single 对缓存有什么帮助？",
      "splitChunks: { chunks: \"all\" } 适合解决哪类重复打包问题？"
    ],
    reviewAnswers: [
      "dynamic import 适合用户不一定马上使用、体积较大或属于独立路径的内容，例如设置页、图表库、富文本编辑器、路由页面、管理后台模块等。它把加载时机从首屏启动延后到真正需要时。",
      "拆包过细会增加请求数量、运行时调度成本和缓存管理复杂度，也可能让用户在交互时频繁等待小 chunk。拆包应该围绕真实加载路径和缓存收益，而不是单纯追求文件数量更多。",
      "HTML 是静态资源版本的入口，它里面引用最新的 JS/CSS 文件名。如果 HTML 被长期强缓存，用户可能一直拿到旧 HTML，进而继续加载旧资源。通常让 HTML 快速更新，让带 contenthash 的静态资源长期缓存。",
      "webpack runtime 里包含模块加载逻辑和 chunk 清单。单独拆出 runtime 后，业务入口和运行时清单变化可以分离，减少无关代码因为清单变化而失效的概率。",
      "它可以把入口和异步 chunk 中共同依赖的模块抽出来，尤其是第三方库或多个页面共享的工具模块，避免同一份代码被重复打进多个 chunk。"
    ]
  };
