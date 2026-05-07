export const lesson = {
    id: "asset-strategy",
    level: "工程",
    title: "静态资源策略进阶",
    summary: "理解图片、字体、SVG 等资源在依赖图中的不同处理方式。",
    details: [
      "webpack 5 的 Asset Modules 让静态资源不再必须依赖 file-loader、url-loader 或 raw-loader。资源可以输出成文件、内联成 data URL、作为源码字符串返回，或由 webpack 按大小自动选择。",
      "asset/resource 适合图片、字体、视频等需要独立文件和缓存的资源；asset/inline 适合很小的图标或占位图；asset/source 适合需要原始文本内容的文件。",
      "asset 会按 parser.dataUrlCondition.maxSize 自动决定内联或输出文件。阈值不是越大越好，内联会减少请求，但也会增大 JS/CSS 体积并影响缓存粒度。",
      "SVG 要按用途选择处理方式。作为图片地址时可走 asset/resource；需要读取源码或做内联图标时可用 asset/source 或专门的 SVG 工具链；不要把所有 SVG 都用同一种规则处理。"
    ],
    keyPoints: [
      "Asset Modules 替代许多旧 loader",
      "asset/resource 输出独立文件",
      "asset/inline 生成 data URL",
      "asset/source 返回源码文本",
      "内联阈值影响请求和缓存",
      "SVG 应按使用方式选择策略"
    ],
    examples: [
      {
        title: "为图片和字体设置资源输出路径",
        language: "js",
        code: `export default {
  module: {
    rules: [
      {
        test: /\\.(png|jpg|jpeg|gif|webp)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        },
        generator: {
          filename: "assets/images/[name].[contenthash:8][ext]"
        }
      },
      {
        test: /\\.(woff2?|ttf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash:8][ext]"
        }
      }
    ]
  }
};`
      },
      {
        title: "把 SVG 当作源码导入",
        language: "js",
        code: `export default {
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: "asset/source"
      }
    ]
  }
};

// import iconSource from "./icon.svg?raw";`
      }
    ],
    review: [
      "asset/resource 和 asset/inline 的核心区别是什么？",
      "为什么内联资源阈值不能设置得过大？",
      "字体文件为什么通常更适合 asset/resource？",
      "SVG 为什么经常需要多种处理策略？"
    ],
    reviewAnswers: [
      "asset/resource 会输出独立文件并返回 URL；asset/inline 会把资源转成 data URL，直接内联到引用它的 JS 或 CSS 中。",
      "阈值过大会把大量二进制内容塞进 JS/CSS，增加主资源体积，也让资源无法独立缓存。减少请求和保持缓存粒度之间需要平衡。",
      "字体通常体积不小，并且适合被浏览器单独缓存。输出独立文件更利于缓存控制和跨页面复用。",
      "有时 SVG 只是图片 URL，有时需要读取源码，有时要作为组件或内联图标处理。不同用途对缓存、样式控制和可访问性要求不同。"
    ]
  };
