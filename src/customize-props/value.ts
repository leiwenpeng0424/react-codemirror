import { EditorView } from "@codemirror/view"
import { useEffect } from "react"
import { isSameTextAccordingToDoc } from "../utils"

export default function useChangedValue(
  value: string,
  view: EditorView
): void {
  useEffect(() => {
    if (view && !isSameTextAccordingToDoc(view, value)) {
      view.dispatch({
        changes: [
          {
            from: 0,
            to: view.state.doc.length,
            insert: value,
          },
        ],
      })
    }
  }, [value, view])
}
