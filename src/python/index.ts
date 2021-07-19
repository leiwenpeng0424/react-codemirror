import { snippets } from "./snippets"
import { pythonLanguage } from "@codemirror/lang-python"
import { LanguageSupport } from "@codemirror/language"
import { completeFromList, ifNotIn } from "@codemirror/autocomplete"
import { CommonProps } from "../ReactCodemirror"
import { keywordsCompletions } from "./complete"
import { EditorState } from "@codemirror/state"

export interface PythonProps extends CommonProps {
  language: "python"
}

export default function python(): LanguageSupport {
  return new LanguageSupport(pythonLanguage, [
    pythonLanguage.data.of({
      autocomplete: ifNotIn(
        ["LineComment", "BlockComment", "String"],
        completeFromList(snippets)
      ),
    }),
    keywordsCompletions(),
    EditorState.tabSize.of(4),
  ])
}
