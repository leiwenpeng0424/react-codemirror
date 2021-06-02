import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { keymap } from "@codemirror/view"
import { setPromptText } from "../keymapPrompt/prompt"
import StandardSqlFormatter from "../../sql/formatter/StandardSqlFormatter"

const defaultFormatter = new StandardSqlFormatter({
  uppercase: true,
})

export default function format(): Extension {
  return keymap.of([
    {
      key: "Cmd-Shift-f",
      run: (view: EditorView) => {
        const query = view.state.doc
          .toJSON()
          .join(view.state.lineBreak)

        void Promise.resolve<string>(
          defaultFormatter.format(query)
        ).then((formattedDoc) => {
          return view.dispatch({
            changes: [
              {
                from: 0,
                to: view.state.doc.length,
                insert: formattedDoc,
              },
            ],
            effects: [setPromptText.of("Cmd-Shift-f")],
          })
        })

        return true
      },
    },
  ])
}
