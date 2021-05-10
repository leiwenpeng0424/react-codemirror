/// theme

import {
  Compartment,
  Extension,
  StateEffect,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useEffect, useState } from "react"

import { oneDark as dark } from "../theme/dark"
import { oneDark as light } from "../theme/light"

const themeCompart: Compartment = new Compartment()

const THEMES = {
  dark,
  light,
}

function reconfigure(
  theme: keyof typeof THEMES
): StateEffect<unknown> {
  return themeCompart.reconfigure(THEMES[theme])
}

export default function useThemeProp(
  theme: keyof typeof THEMES,
  view: EditorView
): Extension {
  const [compart] = useState<Extension>(() =>
    themeCompart.of(THEMES[theme])
  )

  useEffect(() => {
    view &&
      view.dispatch({
        effects: [reconfigure(theme)],
      })
  }, [theme, view])

  return compart
}
