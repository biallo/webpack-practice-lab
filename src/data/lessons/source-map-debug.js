export const lesson = {
    id: "source-map-debug",
    level: "调试",
    title: "Source Map 与调试策略",
    summary: "选择合适的 devtool，让开发调试和生产排错都更可控。",
    details: [
      "Source Map 把构建后的代码映射回源码。没有它，浏览器报错只能看到压缩后的 bundle 位置，很难定位真实文件和行号。",
      "开发环境更看重重构建速度和调试体验，常用 eval-cheap-module-source-map 这类速度较快的配置。生产环境更看重安全和错误定位，常见选择是 source-map、hidden-source-map 或 nosources-source-map。",
      "生产 source map 不能随便公开。公开完整源码可能暴露业务逻辑、注释和内部路径。很多团队会把 source map 上传到错误监控平台，而不是让浏览器直接访问。",
      "devtool 没有绝对最优。你需要结合构建速度、源码暴露风险、错误监控方式和团队排错习惯来选择。"
    ],
    keyPoints: [
      "source map 映射 bundle 到源码",
      "开发环境优先速度和调试体验",
      "生产环境要控制源码暴露",
      "hidden-source-map 适合上传监控平台",
      "nosources-source-map 隐藏源码内容",
      "devtool 选择需要权衡"
    ],
    examples: [
      {
        title: "按环境选择 devtool",
        language: "js",
        code: `export default (env, argv) => ({
  devtool:
    argv.mode === "production"
      ? "hidden-source-map"
      : "eval-cheap-module-source-map"
});`
      }
    ],
    review: [
      "source map 解决了什么调试问题？",
      "为什么生产 source map 不一定应该公开访问？",
      "hidden-source-map 适合什么场景？"
    ],
    reviewAnswers: [
      "它把构建后的压缩代码位置映射回源码文件和行列号，让浏览器错误、断点调试和错误监控能定位到真实源码。",
      "公开 source map 可能让用户下载到源码内容、注释、内部文件路径和业务实现细节。生产环境通常需要结合安全策略决定是否公开。",
      "hidden-source-map 会生成 map 文件，但不会在 bundle 末尾写 sourceMappingURL。它适合把 map 上传到 Sentry 等错误监控平台，由平台还原堆栈，而不是让浏览器公开加载。"
    ]
  };
