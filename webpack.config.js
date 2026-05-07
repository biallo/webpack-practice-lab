import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: {
      app: "./src/index.js"
    },
    output: {
      clean: true,
      filename: isProduction ? "assets/js/[name].[contenthash:8].js" : "assets/js/[name].js",
      chunkFilename: isProduction
        ? "assets/js/[name].[contenthash:8].chunk.js"
        : "assets/js/[name].chunk.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: ""
    },
    devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [isProduction ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/images/[name].[contenthash:8][ext]"
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: isProduction
      }),
      new MiniCssExtractPlugin({
        filename: "assets/css/[name].[contenthash:8].css"
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public/icons", to: "icons" },
          { from: "public/site.webmanifest", to: "site.webmanifest" }
        ]
      })
    ],
    optimization: {
      moduleIds: "deterministic",
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all"
      }
    },
    devServer: {
      hot: true,
      open: false,
      port: 8080,
      static: {
        directory: path.resolve(__dirname, "public")
      }
    }
  };
};
