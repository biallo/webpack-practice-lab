export const lesson = {
    id: "define-plugin-env",
    level: "工程",
    title: "DefinePlugin 与环境变量",
    summary: "区分构建时替换、前端公开变量和真实 secret。",
    details: [
      "DefinePlugin 做的是源码级文本替换。它可以把 process.env.NODE_ENV 或 __APP_VERSION__ 这类标识替换成字面量，让压缩器进一步删除不可达分支。",
      "前端环境变量本质上会进入浏览器 bundle。只要注入到前端代码里，用户就能看到。因此 API key、数据库密码、私钥等 secret 绝不能通过 DefinePlugin 暴露。",
      "很多框架会约定公开变量前缀，例如 VITE_、NEXT_PUBLIC_。裸 webpack 项目没有默认约束，最好自己建立命名规则，例如只允许 APP_PUBLIC_ 开头的变量注入前端。",
      "运行时配置和构建时配置要分开。需要部署后不用重新构建就能变更的配置，通常应该由服务器返回配置 JSON，或在 HTML 中注入，而不是写死进 bundle。"
    ],
    keyPoints: [
      "DefinePlugin 是构建时替换",
      "替换值要 JSON.stringify",
      "前端变量对用户可见",
      "secret 不能进入 bundle",
      "公开变量需要命名约定",
      "运行时配置不应全部写死"
    ],
    examples: [
      {
        title: "注入公开构建信息",
        language: "js",
        code: `export default {
  plugins: [
    new webpack.DefinePlugin({
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TARGET__: JSON.stringify(process.env.APP_PUBLIC_TARGET ?? "local")
    })
  ]
};`
      },
      {
        title: "在应用代码中使用构建时常量",
        language: "js",
        code: `console.log("version", __APP_VERSION__);

if (__BUILD_TARGET__ === "local") {
  console.log("running local build");
}`
      }
    ],
    review: [
      "DefinePlugin 为什么需要 JSON.stringify？",
      "为什么前端环境变量不能保存 secret？",
      "构建时配置和运行时配置如何选择？",
      "DefinePlugin 的文本替换为什么可能影响 dead code elimination？"
    ],
    reviewAnswers: [
      "DefinePlugin 是文本替换，传入字符串 hello 会被当成变量名 hello，而不是字符串字面量。JSON.stringify('hello') 会生成带引号的代码字符串。",
      "前端 bundle 会下载到用户浏览器，任何写进去的值都可以被查看。secret 应留在服务器、CI secret 或部署平台中，不能打包进浏览器代码。",
      "构建后不需要改变的值适合构建时注入，例如版本号、构建目标。需要部署后按环境改变的值更适合运行时读取，例如服务端返回 config.json 或 HTML 注入。",
      "如果条件在构建时被替换成字面量，例如 if (false)，压缩器就能删除不可达分支。这也是构建时常量适合表达编译目标和特性开关的原因之一。"
    ]
  };
