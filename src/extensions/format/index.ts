import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { keymap } from "@codemirror/view"
import { setPromptText } from "../keymapPrompt/prompt"

type Formatter = (str: string) => string | Promise<string>

export default function format(f: Formatter): Extension {
  return keymap.of([
    {
      key: "Cmd-Shift-f",
      run: (view: EditorView) => {
        void Promise.resolve<string>(
          f?.(view.state.doc.toJSON().join(view.state.lineBreak))
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
