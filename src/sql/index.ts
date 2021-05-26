import { LanguageSupport } from "@codemirror/language"
import { CommonProps } from "../ReactCodemirror"
import {
  StandardSQL,
  keywordCompletion,
  SQLConfig,
} from "@codemirror/lang-sql"
import { completeFromSchema } from "./folkSchemaCompletion"
export interface SqlProps extends CommonProps {
  language: "sql"
  langOptions?: SQLConfig
  formatter?: (string) => string | Promise<string>
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
  ])
}

export { sql, SQLConfig, StandardSQL }
