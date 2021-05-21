/// editable

import {
  Compartment,
  Extension,
  StateEffect,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useEffect, useState } from "react"

export const editableCompart: Compartment = new Compartment()

function reconfigure(editable: boolean): StateEffect<unknown> {
  return editableCompart.reconfigure(EditorView.editable.of(editable))
}

export default function useEditableProp(
  value: boolean,
  view: EditorView
): Extension {
  const [compart] = useState<Extension>(() =>
    editableCompart.of(EditorView.editable.of(value))
  )

  useEffect(() => {
    view?.dispatch({
      effects: [reconfigure(value)],
    })
  }, [value, view])

  return compart
}
