import { Diagnostic } from "@codemirror/lint"
import { EditorView } from "@codemirror/view"
import { ExtraDiagnostic } from "./customize-props/diagnostics"

function makeLineNumGreaterThanZero(lineNum: number): number {
  return lineNum <= 0 ? 1 : lineNum
}

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
      const { StartLine, EndLine, StartOffset, EndOffset } =
        lineOffset

      let from: number, to: number

      if (maxLines >= EndLine) {
        const { from: startFrom, to: startTo } = view.state.doc.line(
          makeLineNumGreaterThanZero(StartLine) + 1
        )
        const { from: endFrom, to: endTo } = view.state.doc.line(
          makeLineNumGreaterThanZero(EndLine) + 1
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

  return found.sort((a, b) => {
    if (a.from < b.from) {
      return -1
    }
    if (a.from > b.from) {
      return 1
    }

    return 0
  })
}

export const isSameTextAccordingToDoc = (
  editor: EditorView,
  value = ""
): boolean => {
  const doc = editor.state.doc.toJSON()
  const nextDocText = value.split(editor.state.lineBreak)

  if (doc.length !== nextDocText.length) {
    return false
  }

  let i = doc.length - 1

  while (i >= 0) {
    if (doc[i] !== nextDocText[i]) {
      return false
    }

    i--
  }

  return true
}

export function getStyle(element: Element, attr: string): string {
  return (
    (window?.getComputedStyle(element, null)[attr] as string) ?? ""
  )
}
