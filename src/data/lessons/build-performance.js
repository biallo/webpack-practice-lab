export const lesson = {
    id: "build-performance",
    level: "优化",
    title: "持久化缓存与构建速度",
    summary: "用文件系统缓存和构建分析减少本地开发与 CI 的等待时间。",
    details: [
      "webpack 5 内置文件系统缓存。开启 cache: { type: \"filesystem\" } 后，webpack 会把编译结果缓存到磁盘，下次构建可以跳过大量没有变化的模块工作。",
      "构建慢要先定位瓶颈。常见问题包括 loader 转译范围过宽、没有 exclude node_modules、source map 过重、类型检查塞进主构建、插件做了大量同步工作等。",
      "loader 和插件也可能有自己的缓存或并行能力，但不要盲目叠加。缓存需要正确的失效条件，错误缓存比慢构建更危险，因为它会让产物和源码不一致。",
      "CI 中的缓存目标和本地不同。本地追求即时反馈，CI 追求可复现和稳定。缓存 npm 下载、webpack filesystem cache 或构建产物时，都要考虑 lockfile、Node 版本和配置变更。"
    ],
    keyPoints: [
      "webpack 5 支持 filesystem cache",
      "构建优化前要定位瓶颈",
      "loader 范围越窄越好",
      "source map 会影响构建速度",
      "缓存必须有正确失效条件",
      "CI 缓存要兼顾可复现"
    ],
    examples: [
      {
        title: "开启 webpack 文件系统缓存",
        language: "js",
        code: `export default {
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [import.meta.url]
    }
  }
};`
      },
      {
        title: "缩小 loader 处理范围",
        language: "js",
        code: `export default {
  module: {
    rules: [
      {
        test: /\\.m?js$/,
        include: new URL("./src", import.meta.url).pathname,
        use: "babel-loader"
      }
    ]
  }
};`
      }
    ],
    review: [
      "filesystem cache 解决的是什么性能问题？",
      "为什么 loader 应该尽量限制 include 或 exclude？",
      "source map 为什么会影响构建速度？",
      "CI 缓存为什么不能只追求越多越好？"
    ],
    reviewAnswers: [
      "它把可复用的编译结果保存到磁盘，源码和配置没变时可以复用旧结果，减少重复解析、转译和优化工作。",
      "loader 处理范围越大，webpack 需要转译的文件越多。把 node_modules 或无关目录纳入 Babel/TS 转译，会显著拖慢构建。",
      "高质量 source map 需要记录源码和构建产物之间的映射，生成和写出这些映射都会增加时间和体积。开发和生产应选择不同 devtool。",
      "缓存过多可能掩盖依赖或配置变化，造成难以复现的问题。CI 缓存必须绑定 lockfile、Node 版本和关键配置，保证失效准确。"
    ]
  };
