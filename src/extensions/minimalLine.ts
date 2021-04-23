import { EditorView } from "@codemirror/view"
import { Extension } from "@codemirror/state"

import type { ViewUpdate } from "@codemirror/view"

export default function minimalLines(
  minLines: number = 1
): Extension {
  return [
    EditorView.updateListener.of((update: ViewUpdate) => {
      const { state, view } = update

      const currentLines = state.doc.lines

      if (currentLines < minLines) {
        const offset = minLines - currentLines
        const extraLines = []
        if (offset > 0) {
          for (var i = offset; i > 0; i--) {
            extraLines.push("\n")
          }
        }

        view.dispatch({
          changes: [
            {
              from: state.doc.length,
              insert: extraLines.join(""),
            },
          ],
        })
      }
    }),
  ]
}
