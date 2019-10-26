const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devServer: {
    contentBase: [
      path.join(__dirname, "dist"),
      path.join(__dirname, "static"),
      path.join(__dirname, "node_modules/viz.js"),
    ],
    compress: true,
    port: 8000,
  },
};
