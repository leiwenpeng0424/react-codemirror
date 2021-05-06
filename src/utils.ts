import { Diagnostic } from "@codemirror/lint"
import { EditorView } from "@codemirror/view"
import { ExtraDiagnostic } from "./ReactCodemirror"

export const translateDiagnostics = (
  input: ExtraDiagnostic = {
    checkResult: { checkItems: [], rawSQL: "" },
  },
  view: EditorView
): Diagnostic[] => {
  const {
    checkResult: { checkItems = [] },
  } = input

  const found: Diagnostic[] = []

  const maxLines = view.state.doc.lines

  checkItems.forEach((item) => {
    const { error, errorCode, lineOffsets } = item

    lineOffsets.forEach((lineOffset) => {
      const {
        StartLine,
        EndLine,
        StartOffset,
        EndOffset,
      } = lineOffset

      let from: number, to: number

      if (maxLines >= EndLine) {
        const { from: startFrom, to: startTo } = view.state.doc.line(
          StartLine + 1
        )
        const { from: endFrom, to: endTo } = view.state.doc.line(
          EndLine + 1
        )

        if (startFrom === endFrom && startFrom === endTo) {
          // same line
          from = startFrom + StartOffset
          to = startTo + EndOffset
        } else {
          from = startFrom + StartOffset
          to = endFrom + EndOffset
        }

        found.push({
          from,
          to,
          severity: errorCode == -1 ? "error" : "warning",
          message: error,
        })
      }
    })
  })

  return found
}
