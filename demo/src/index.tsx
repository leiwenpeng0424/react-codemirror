import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist/index"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const App: React.FC<Record<string | number, never>> = () => {
  return (
    <ReactCodemirror
      language="sql"
      style={{ height: 500 }}
      placeholder={[
        "Example1: SELECT * FROM AAA",
        "Example2: SELECT * FROM BBB",
        "Example3: SELECT * FROM CCC",
        "Example4: SELECT * FROM DDD",
        "Example5: SELECT * FROM EEE",
        "Example6: SELECT * FROM FFF",
      ]}
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
