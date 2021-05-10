import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useEffect } from "react"
import { isSameTextAccordingToDoc } from "../utils"
import { editableCompart } from "./editable"

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

export function listenValueChangeAndInvokeCallback(
  handler: (text: string) => void
): Extension {
  return EditorView.updateListener.of(({ docChanged, state }) => {
    const editable = editableCompart.get(state)

    if (
      docChanged &&
      handler &&
      editable &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.facet(editable.facet)
    ) {
      handler(state.doc.toJSON().join(state.lineBreak))
    }
  })
}
