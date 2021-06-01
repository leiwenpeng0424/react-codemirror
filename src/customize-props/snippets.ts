import { useState, useEffect } from "react"
import { Compartment, Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { Snippet, snippetsFacet } from "../extensions/snippets"

const snippetsCompart = new Compartment()

export default function useSnippetsProp(
  extraSnippets: Snippet[] = [],
  view: EditorView
): Extension {
  const [compart] = useState<Extension>(
    snippetsCompart.of(snippetsFacet.of(extraSnippets))
  )

  useEffect(() => {
    view?.dispatch({
      effects: [
        snippetsCompart.reconfigure(snippetsFacet.of(extraSnippets)),
      ],
    })
  }, [extraSnippets, view])

  return compart
}
