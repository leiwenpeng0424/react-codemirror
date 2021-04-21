import { EditorView } from "@codemirror/view"
import { Extension } from "@codemirror/state"

import type { ViewUpdate } from "@codemirror/view"

type Handler = (text: string) => void

export default function viewChange(handler?: Handler): Extension {
  return EditorView.updateListener.of(
    ({ docChanged, state }: ViewUpdate) => {
      if (docChanged) {
        handler && handler(state.doc.toJSON().join(state.lineBreak))
      }
    }
  )
}
