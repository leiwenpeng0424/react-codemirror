const ts = require("rollup-plugin-typescript2")
const buble = require("@rollup/plugin-buble")
const { peerDependencies, name } = require("./package.json")

module.exports = {
  input: "src/index.ts",
  output: {
    file: `dist/${name}.js`,
  },
  plugins: [
    ts(),
    buble({
      objectAssign: true,
      transforms: {},
    }),
  ],
  external: ["react", "codemirror"],
}
