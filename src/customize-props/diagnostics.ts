import { setDiagnostics } from "@codemirror/lint"
import { EditorView } from "@codemirror/view"
import { useEffect } from "react"
import { translateDiagnostics } from "../utils"

export interface ExtraDiagnostic {
  checkNo?: string
  checkResult: DiagnosticResult
  funcOSSList?: unknown[]
  parsedTableResult?: {
    funcs?: string | null
    inCSVs?: string | null
    inHbases?: unknown[]
    inRDBs?: unknown[]
    kafkaItem?: unknown[]
    sinkKafkas?: unknown[]
  }
  withFunc?: boolean
}

type LineOffset = {
  EndLine: number
  EndOffset: number
  StartLine: number
  StartOffset: number
}

type DiagnosticItem = {
  error: string
  errorCode: number
  lineOffsets: LineOffset[]
}

type DiagnosticResult = {
  checkItems: DiagnosticItem[]
  rawSQL: string
}

export default function useDiagnostics(
  diagnostics: ExtraDiagnostic,
  view: EditorView
): void {
  useEffect(() => {
    if (view) {
      const founds = translateDiagnostics(diagnostics, view)

      const first = founds[0]

      // scroll into this first diagnostric result
      if (first) {
        view.scrollPosIntoView(first.from)
      }

      view.dispatch(
        setDiagnostics(
          view.state,
          translateDiagnostics(diagnostics, view)
        )
      )
    }
  }, [diagnostics, view])
}
