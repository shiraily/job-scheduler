import { Configuration } from "webpack";

import path from "path";

import nodeExternals from "webpack-node-externals";

const config: Configuration = {
  mode: "development",
  devtool: 'inline-source-map', // source-mapだと警告が邪魔
  entry: './src/app.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: ["node_modules"],
  },
  module: {  
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  target: "node",
  externals: [nodeExternals()],
};

export default config;
