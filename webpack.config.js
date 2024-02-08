import path from "path";
import ESLintPlugin from "eslint-webpack-plugin";

module.exports = {
  entry: "./src/index",
  target: "node",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [new ESLintPlugin({ extensions: "ts" })],
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader",
      },
    ],
  },
};
