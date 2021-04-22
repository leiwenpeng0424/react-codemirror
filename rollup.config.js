const ts = require("rollup-plugin-typescript2")
const buble = require("@rollup/plugin-buble")
const commonjs = require("@rollup/plugin-commonjs")
const { nodeResolve } = require("@rollup/plugin-node-resolve")
const { terser } = require("rollup-plugin-terser")
const { name, dependencies } = require("./package.json")

const ExtraCodemirrorFiles = [
  "codemirror/addon/lint/lint.js", // addon lint
  "codemirror/mode/sql/sql.js", // sql
  "codemirror/addon/hint/show-hint.js", // addon show-hint
  "codemirror/addon/hint/show-hint.css", // show-hint style sheet
  "codemirror/theme/abcdef.css", // default theme, abcdef
  "codemirror/lib/codemirror.css", // necessary style sheet
  "codemirror/theme/idea.css", // 白色主题
  "@codemirror/basic-setup",
  "@codemirror/lang-javascript",
  "@codemirror/lang-sql",
  "@codemirror/autocomplete",
]

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
