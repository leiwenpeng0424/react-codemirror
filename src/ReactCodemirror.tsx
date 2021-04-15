import React from "react"
import codemirror from "codemirror"
import sqlKeywords from "./keywords"
import "./plugins"
import "./theme"

export type ReactCodemirrorProps = {
  options?: codemirror.EditorConfiguration
  onChange?: VoidFunction
}

function useMount(callback: () => void) {
  React.useEffect(() => {
    callback()
  }, [])
}

/**
 *
 * @param options
 * @param onChange change event
 *
 * @public
 */
export default function ReactCodemirror({
  options,
  onChange,
}: ReactCodemirrorProps): React.ReactElement {
  const codemirrorRef = React.useRef<HTMLTextAreaElement>()
  const codemirrorIns = React.useRef<codemirror.EditorFromTextArea>()

  // function completion(cm: codemirror.Editor) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       const cur = cm.getCursor()
  //       const line = cm.getLine(cur.line)
  //       let start = cur.ch,
  //         end = cur.ch
  //       while (start && /\w/.test(line.charAt(start - 1))) --start
  //       while (end < line.length && /\w/.test(line.charAt(end))) ++end
  //       const word = line.slice(start, end + 1)

  //       const completions = sqlKeywords.keywords
  //         .map((item) => item.text.replace("_", " "))
  //         .filter((keyword) => keyword.toLowerCase().startsWith(word))

  //       resolve({
  //         list: completions,
  //         from: codemirror.Pos(cur.line, start),
  //         to: codemirror.Pos(cur.line, end),
  //       })
  //     }, 100)
  //   })
  // }

  useMount(() => {
    codemirrorIns.current = codemirror.fromTextArea(
      codemirrorRef.current,
      {
        ...options,
        theme: "ayu-dark",
        mode: "sql",
        autocorrect: false,
        lineNumbers: true,
      }
    )

    const editor = codemirrorIns.current
    editor.on("change", () => onChange && onChange())
    editor.on("keypress", (cm: codemirror.Editor) => {
      cm.execCommand("autocomplete")
    })
  })

  return (
    <div className="react-tools-codemirror">
      <textarea
        ref={codemirrorRef as React.LegacyRef<HTMLTextAreaElement>}
        className="react-tools-codemirror-textarea"
      />
    </div>
  )
}

ReactCodemirror.propTypes = {}
