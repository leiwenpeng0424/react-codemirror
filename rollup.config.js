/* eslint-disable @typescript-eslint/no-var-requires */

const ts = require("rollup-plugin-typescript2")
const buble = require("@rollup/plugin-buble")
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const eslint = require("@rollup/plugin-eslint")
// const { terser } = require("rollup-plugin-terser")
const { name, dependencies } = require("./package.json")

module.exports = {
  input: "src/index.ts",
  output: {
    file: `dist/${name}.js`,
    format: "esm",
  },
  plugins: [
    eslint({
      exclude: ["./dist"],
    }),
    ts(),
    nodeResolve(),
    commonjs({
      include: "node_modules/**",
    }),
    buble({
      objectAssign: true,
      transforms: {
        forOf: false,
      },
    }),
  ].filter(Boolean),
  external: [
    "react",
    "lezer",
    "lezer-tree",
    ...Object.keys(dependencies),
  ],
}
