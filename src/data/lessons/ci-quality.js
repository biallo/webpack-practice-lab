export const lesson = {
    id: "ci-quality",
    level: "发布",
    title: "CI/CD 构建质量检查",
    summary: "在发布流水线中加入类型、测试、体积和产物检查。",
    details: [
      "生产发布不应该只跑 webpack build。真实项目通常会在 CI 中串联安装、类型检查、lint、测试、构建、产物检查和部署，让问题尽量在发布前暴露。",
      "bundle size budget 可以防止体积悄悄膨胀。它不一定要求每次都变小，但应该在入口资源突然变大时给出明确提醒，逼迫团队解释原因。",
      "产物检查关注 dist 是否包含入口 HTML、manifest、图标、带 hash 的 JS/CSS，以及是否意外包含 map、测试文件或敏感文件。构建成功不代表发布产物正确。",
      "CI 缓存能加速流水线，但要保证可复现。常见做法是使用 npm ci，缓存 npm 下载目录，并用 lockfile 作为缓存 key 的一部分。"
    ],
    keyPoints: [
      "发布前应有多层质量检查",
      "类型检查和测试可独立于 webpack",
      "size budget 防止体积漂移",
      "dist 产物需要显式检查",
      "npm ci 更适合 CI",
      "缓存 key 应包含 lockfile"
    ],
    examples: [
      {
        title: "CI 中串联质量检查",
        language: "yaml",
        code: `steps:
  - uses: actions/checkout@v5
  - uses: actions/setup-node@v5
    with:
      node-version: 24
      cache: npm
  - run: npm ci
  - run: npm run typecheck
  - run: npm test
  - run: npm run build`
      },
      {
        title: "给产物检查留一个脚本入口",
        language: "json",
        code: `{
  "scripts": {
    "build": "webpack --mode production",
    "check:dist": "node scripts/check-dist.js",
    "release:check": "npm run build && npm run check:dist"
  }
}`
      }
    ],
    review: [
      "为什么发布流水线不应该只运行 webpack build？",
      "bundle size budget 解决什么团队协作问题？",
      "产物检查应该关注哪些内容？",
      "为什么 npm ci 更适合 CI 环境？"
    ],
    reviewAnswers: [
      "webpack build 主要证明产物能生成，不一定证明类型正确、测试通过、体积合理或 dist 内容适合发布。发布前需要多层检查。",
      "它让体积增长变成显性事件。入口资源突然变大时，团队需要知道原因并决定是否接受，而不是等用户感觉变慢才发现。",
      "应检查入口 HTML、JS/CSS、图标、manifest、资源路径、source map 策略、是否包含敏感文件，以及部署平台需要的特殊文件。",
      "npm ci 会按 lockfile 精确安装，依赖不一致时直接失败，并且不会改写 lockfile，更适合可复现构建。"
    ]
  };
