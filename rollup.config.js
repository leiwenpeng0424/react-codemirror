const ts = require("rollup-plugin-typescript2")
const buble = require("@rollup/plugin-buble")
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")
const { name, dependencies } = require("./package.json")

module.exports = {
  input: "src/index.ts",
  output: {
    file: `dist/${name}.js`,
    format: "esm",
  },
  plugins: [
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
    // process.env.NODE_ENV !== "development" && terser(),
  ].filter(Boolean),
  external: ["react", ...Object.keys(dependencies)],
}
