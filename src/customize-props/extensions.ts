/// editable

import {
  Compartment,
  Extension,
  StateEffect,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useEffect, useState } from "react"

const extensionsCompart: Compartment = new Compartment()

function reconfigure(extensions: Extension[]): StateEffect<unknown> {
  return extensionsCompart.reconfigure(extensions)
}

export default function useExtensionsProp(
  extensions: Extension[],
  view: EditorView
): Extension {
  const [compart] = useState<Extension>(() =>
    extensionsCompart.of(extensions)
  )

  useEffect(() => {
    view?.dispatch({
      effects: [reconfigure(extensions)],
    })
  }, [extensions, view])

  return compart
}
