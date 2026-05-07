export const lesson = {
    id: "static-deployment",
    level: "发布",
    title: "发布产物与静态部署",
    summary: "理解 webpack build 后的 dist 如何被不同静态托管平台发布。",
    details: [
      "webpack 的职责通常到 dist 结束。dist 里包含 HTML、JS、CSS、图片、manifest 等静态文件，后续可以交给 Nginx、CDN、对象存储、Netlify、Vercel、Cloudflare Pages、GitHub Pages 等平台托管。",
      "静态部署最重要的是资源路径、缓存策略和 fallback。资源路径由 output.publicPath、HTML 中的相对路径、部署子路径共同决定；缓存策略决定用户如何拿到新版本；fallback 决定前端路由刷新时是否能回到 index.html。",
      "单页应用如果使用 history 路由，刷新 /settings 这样的路径时，静态服务器需要返回 index.html，再由前端路由接管。否则服务器会按真实文件路径查找 /settings，最终返回 404。",
      "CI 中应使用可复现安装和构建，例如 npm ci + npm run build。部署动作可以因平台不同而变化，但核心产物通常都是 dist。把构建和发布分开，有助于在发布前检查产物和失败原因。"
    ],
    keyPoints: [
      "webpack build 生成静态 dist",
      "静态托管平台只需要产物目录",
      "publicPath 决定资源加载路径",
      "SPA 路由需要 fallback 到 HTML",
      "HTML 和 hash 资源缓存策略不同",
      "CI 构建应可复现"
    ],
    examples: [
      {
        title: "通用 CI 构建步骤",
        language: "yaml",
        code: `steps:
  - uses: actions/checkout@v5
  - uses: actions/setup-node@v5
    with:
      node-version: 24
      cache: npm
  - run: npm ci
  - run: npm run build
  # 不同平台在这里发布 dist`
      },
      {
        title: "根据部署路径选择 publicPath",
        language: "js",
        code: `// 部署到域名根路径时可以使用 "/"
export default {
  output: {
    publicPath: "/"
  }
};

// 部署到任意子路径或需要相对路径时可以使用 ""
export default {
  output: {
    publicPath: ""
  }
};`
      },
      {
        title: "Nginx 中给 SPA 配置 fallback",
        language: "yaml",
        code: `location / {
  try_files $uri $uri/ /index.html;
}`
      }
    ],
    review: [
      "webpack 的发布产物通常是什么？",
      "publicPath 与部署路径有什么关系？",
      "为什么 SPA 静态部署经常需要 fallback 到 index.html？",
      "为什么 CI 中更推荐 npm ci 而不是 npm install？",
      "发布时应该怎样处理 HTML 和带 hash 静态资源的缓存差异？"
    ],
    reviewAnswers: [
      "通常是 dist 目录，其中包含入口 HTML、带 hash 的 JS/CSS、图片、字体、manifest 等静态资源。部署平台一般只需要托管这个目录。",
      "publicPath 会影响运行时资源 URL 的拼接。部署在域名根路径时可以用 /；部署在子路径或希望产物可移动时，使用相对路径会更稳。",
      "history 路由的 /settings、/profile 等路径并不是服务器上的真实文件。刷新这些路径时，静态服务器需要返回 index.html，让前端应用重新接管路由。",
      "npm ci 会严格按 package-lock.json 安装，并在依赖不一致时失败，更适合可复现的 CI 构建。npm install 可能更新 lockfile，导致构建结果不够稳定。",
      "HTML 应该能较快更新，以便引用最新资源；带 contenthash 的 JS/CSS/图片可以长期缓存。发布系统还应保留旧 hash 资源一段时间，避免旧 HTML 请求旧 chunk 时 404。"
    ]
  };
