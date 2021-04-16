const ts = require("rollup-plugin-typescript2")
const buble = require("@rollup/plugin-buble")
const { name } = require("./package.json")

const ExtraCodemirrorFiles = [
  "codemirror/addon/lint/lint.js", // addon lint
  "codemirror/mode/sql/sql.js", // sql
  "codemirror/addon/hint/show-hint.js", // addon show-hint
  "codemirror/addon/hint/show-hint.css", // show-hint style sheet
  "codemirror/theme/abcdef.css", // default theme, abcdef
  "codemirror/lib/codemirror.css", // necessary style sheet
]

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
  external: ["react", "codemirror", ...ExtraCodemirrorFiles],
}
