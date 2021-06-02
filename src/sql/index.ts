import { LanguageSupport } from "@codemirror/language"
import { CommonProps } from "../ReactCodemirror"
import {
  StandardSQL,
  keywordCompletion,
  SQLConfig,
} from "@codemirror/lang-sql"
import { completeFromSchema } from "./folkSchemaCompletion"
import analysisSql from "./analysis"
import { EditorView } from "@codemirror/view"
import { keymap } from "@codemirror/view"
import { setPromptText } from "../extensions/keymapPrompt/prompt"
import StandardSqlFormatter from "./formatter/StandardSqlFormatter"

const defaultFormatter = new StandardSqlFormatter({
  uppercase: true,
})

export interface SqlProps extends CommonProps {
  language: "sql"
  langOptions?: SQLConfig
}

export default function sql(config: SQLConfig = {}): LanguageSupport {
  const configs = {
    ...config,
  }

  if (!configs.schema) {
    configs.schema = {}
  }

  const lang = configs.dialect || StandardSQL
  return new LanguageSupport(lang.language, [
    config.schema
      ? (config.dialect || StandardSQL).language.data.of({
          autocomplete: completeFromSchema(
            config.schema,
            config.tables,
            config.defaultTable
          ),
        })
      : [],
    keywordCompletion(lang, !!configs.upperCaseKeywords),
    analysisSql(),
    keymap.of([
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
    ]),
  ])
}

export { sql, SQLConfig, StandardSQL }
