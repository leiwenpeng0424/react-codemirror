import { EditorView } from "@codemirror/view"

/**
 * format 方法接受的参数
 */
export type FormatConfig = {
  parser(text: string): string | Promise<string>
}

function startFormat(view: EditorView, configs: FormatConfig): void {
  const str = configs.parser(view.state.doc.toJSON().join("\n"))

  Promise.resolve(str).then((resolveStr) => {
    view.dispatch({
      changes: [
        {
          from: 0,
          to: view.state.doc.length,
          insert: resolveStr,
        },
      ],
    })
  })
}

export { startFormat }
