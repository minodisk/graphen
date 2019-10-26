const replace = require("rollup-plugin-replace");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("rollup-plugin-typescript");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");

const namedExports = names =>
  names.reduce((obj, name) => {
    obj[name] = Object.keys(require(name));
    return obj;
  }, {});

module.exports = {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
  },
  plugins: [
    replace({ "process.env.NODE_ENV": process.env.NODE_ENV }),
    resolve({
      mainFields: ["jsnext", "main", "brwoser"],
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: namedExports([
        "tslib",
        "react",
        "react-is",
        "react-dom",
        "@emotion/core",
      ]),
    }),
    typescript(),
    // serve({
    //   contentBase: [
    //     "dist",
    //     "static",
    //     "node_modules/viz.js",
    //     "node_modules/ace-builds/src",
    //   ],
    // }),
    // livereload({
    //   watch: "dist",
    // }),
  ],
};
