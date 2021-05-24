import { useState, useEffect } from "react"
import { Compartment, Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import placeholder from "../extensions/placeholder"

const pluginCompart = new Compartment()

export default function usePlaceholderProp(
  text: string[],
  view: EditorView
): Extension {
  const [compart] = useState<Extension>(
    pluginCompart.of(placeholder(text))
  )

  useEffect(() => {
    view?.dispatch({
      effects: [pluginCompart.reconfigure(placeholder(text))],
    })
  }, [text, view])

  return compart
}
