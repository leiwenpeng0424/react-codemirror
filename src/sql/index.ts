import { LanguageSupport } from "@codemirror/language"
import { CommonProps } from "../ReactCodemirror"
import {
  StandardSQL,
  keywordCompletion,
  schemaCompletion,
  SQLConfig,
} from "@codemirror/lang-sql"
import spaceCompletion from "./keymapSpaceCompletionForSQL"
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
    spaceCompletion(lang),
    schemaCompletion(configs),
    keywordCompletion(lang, !!configs.upperCaseKeywords),
  ])
}

export { sql, SQLConfig, StandardSQL, schemaCompletion }
