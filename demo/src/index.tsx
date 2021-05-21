import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist/index"

import { EditorView } from "@codemirror/view"

/// tesing extension props
const ex = EditorView.updateListener.of(({ docChanged, state }) => {
  if (docChanged) {
    console.log(
      "from outside extension",
      state.doc.toJSON().join(state.lineBreak)
    )
  }
})

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const App: React.FC<Record<string | number, never>> = () => {
  return (
    <ReactCodemirror
      language="sql"
      style={{ height: 500 }}
      extensions={[ex]}
      langOptions={{
        schema: {
          tableA: [
            {
              label: "column-a",
              detail: "this is the detail about the column-a",
            },
          ],
          tableB: ["columnA", "columnB", "columnC", "columnD"],
          tableC: ["columnA", "columnB", "columnC", "columnD"],
        },
      }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
