import { Configuration } from "webpack";

import path from "path";

import nodeExternals from "webpack-node-externals";

const config: Configuration = {
  mode: "development",
  devtool: "inline-source-map", // source-mapだと警告が邪魔
  entry: path.join(__dirname, "./src/app.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts"],
    modules: ["node_modules"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  target: "node",
  externals: [nodeExternals()],
};

export default config;
