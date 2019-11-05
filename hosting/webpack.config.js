const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "public/assets/scripts"),
    filename: "index.js",
    publicPath: "/assets/scripts/",
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
    contentBase: [path.join(__dirname, "public")],
    compress: true,
    port: 8000,
    historyApiFallback: {
      rewrites: [{ from: /^\/(?!assets\/)/, to: "/index.html" }],
    },
  },
};
