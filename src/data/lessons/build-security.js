export const lesson = {
    id: "build-security",
    level: "发布",
    title: "构建产物安全",
    summary: "检查 source map、环境变量和 public 资源中可能泄露的信息。",
    details: [
      "前端构建产物会交给浏览器，用户可以下载、格式化和分析。任何进入 bundle、source map、public 目录或 HTML 的信息，都应默认视为公开信息。",
      "环境变量尤其容易误用。以为写在 .env 或 CI secret 里就安全，但只要通过 DefinePlugin 或类似机制注入前端代码，最终就会出现在浏览器可见的产物里。",
      "source map 能帮助错误定位，也可能暴露源码、注释、内部路径和业务逻辑。生产环境需要明确是否公开 map，或只上传到错误监控平台。",
      "public 目录通常会原样复制，不能放私钥、内部文档、未发布接口说明、测试账号等敏感文件。构建前后的产物检查应成为发布流程的一部分。"
    ],
    keyPoints: [
      "浏览器端产物默认公开",
      "前端环境变量不能保存 secret",
      "source map 可能泄露源码信息",
      "public 目录会被原样发布",
      "构建产物需要发布前检查",
      "secret 应留在服务器或平台侧"
    ],
    examples: [
      {
        title: "只注入允许公开的变量",
        language: "js",
        code: `import webpack from "webpack";

export default {
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __PUBLIC_API_BASE__: JSON.stringify(process.env.PUBLIC_API_BASE)
    })
  ]
};`
      },
      {
        title: "生产环境使用不公开引用的 source map",
        language: "js",
        code: `export default {
  devtool: "hidden-source-map"
};`
      }
    ],
    review: [
      "为什么前端 bundle 里的信息都应视为公开？",
      "CI secret 什么时候会变得不再安全？",
      "生产 source map 有什么安全取舍？",
      "public 目录为什么需要特别小心？"
    ],
    reviewAnswers: [
      "bundle 会被下载到用户浏览器，任何人都可以查看网络请求、保存文件并格式化代码。混淆和压缩不能当作安全边界。",
      "secret 如果只留在 CI 或服务器端是安全边界的一部分；一旦被注入前端代码或 HTML，它就进入公开产物，用户可以读取。",
      "公开 map 方便浏览器调试，但可能暴露源码和内部路径。不公开 map 或上传到错误监控平台，可以兼顾线上定位和源码保护。",
      "public 文件通常不经过依赖图和安全检查，而是原样复制到 dist。误放敏感文件会直接发布出去。"
    ]
  };
