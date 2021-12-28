// webpack.config.dev.js

const port = process.env.PORT || 3000;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 추가 코드

module.exports = {
  mode: "development", // 개발 환경
  entry: "./src/index.js", // 애플리케이션 시작 경로
  // 번들된 파일 경로
  output: {
    filename: "bundle.js",
  },
  devServer: {
    host: "localhost",
    port: port,
    open: true, // open page when start
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 빌드할 파일 확장자 정규식
        exclude: /node_modules/, // 제외할 파일 정규식
        use: {
          loader: "babel-loader", // 사용할 로더 이름
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true, // 코드 최적화 옵션
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
  ],
};
