export const lesson = {
    id: "production-cache",
    level: "优化",
    title: "生产缓存策略",
    summary: "把 contenthash、runtimeChunk、splitChunks 和 HTTP 缓存连起来理解。",
    details: [
      "生产缓存不是只给文件名加 hash。真正的目标是让长期不变的资源稳定缓存，让变化的资源及时更新，并避免一次小改动让所有文件 hash 都失效。",
      "runtimeChunk: single 能把 webpack 运行时代码和 chunk 清单拆出来。这样业务入口文件不必因为运行时清单变化而频繁失效，缓存边界更清楚。",
      "splitChunks 可以把第三方依赖或公共模块拆出来。第三方依赖通常变化频率低，业务代码变化频率高，拆开后浏览器可以更久缓存 vendor。",
      "HTML 通常不长期缓存，JS/CSS/assets 可以使用 contenthash 后长期缓存。部署时要保证旧资源在一段时间内仍可访问，避免用户拿着旧 HTML 请求不到旧 chunk。"
    ],
    keyPoints: [
      "HTML 负责指向最新资源",
      "带 contenthash 的资源适合长期缓存",
      "runtimeChunk 降低入口缓存失效",
      "splitChunks 拆分低频变化依赖",
      "部署要考虑旧资源保留",
      "缓存策略需要 HTTP 头配合"
    ],
    examples: [
      {
        title: "生产缓存相关配置",
        language: "js",
        code: `export default {
  output: {
    filename: "assets/js/[name].[contenthash:8].js",
    chunkFilename: "assets/js/[name].[contenthash:8].chunk.js"
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all"
    }
  }
};`
      }
    ],
    review: [
      "为什么 HTML 和 JS/CSS 的缓存策略通常不同？",
      "runtimeChunk 单独拆出来有什么缓存收益？",
      "为什么发布时要保留一段时间的旧静态资源？",
      "moduleIds: deterministic 为什么能减少无意义的缓存失效？"
    ],
    reviewAnswers: [
      "HTML 是资源入口，需要尽快更新以指向新 hash 文件；JS/CSS 文件名带 contenthash，内容不变文件名不变，适合长期缓存。",
      "webpack runtime 包含模块加载逻辑和 chunk 清单。拆出 runtime 后，业务代码和运行时清单的变化可以分开，减少入口文件因清单变化而失效的概率。",
      "用户可能已经加载了旧 HTML，随后才请求旧 chunk。如果部署时立刻删除旧资源，用户会遇到 chunk 404。保留旧资源能让滚动发布和缓存过渡更平滑。",
      "稳定的模块 ID 可以减少新增或删除模块时对其他模块编号的连锁影响。无关模块内容没变时，它们更可能保持原来的 contenthash，从而继续命中浏览器缓存。"
    ]
  };
