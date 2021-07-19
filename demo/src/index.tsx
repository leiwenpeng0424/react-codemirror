import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror, ReactCodemirrorRefValues } from "../../dist"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const text = `

`

const App: React.FC<Record<string | number, never>> = () => {
  const ref = React.useRef<ReactCodemirrorRefValues>()
  const [t, setT] = React.useState(text)

  return (
    <ReactCodemirror
      ref={ref}
      value={t}
      language="sql"
      style={{ height: 500, fontSize: 14 }}
      scrollOptions={{
        topOffset: 80,
        bottomOffset: 80,
      }}
      langOptions={{
        schema: {},
      }}
      extensions={[]}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
