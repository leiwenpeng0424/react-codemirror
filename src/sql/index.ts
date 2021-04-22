import { LanguageSupport } from "@codemirror/language"
import { CommonProps } from "../ReactCodemirror"
import {
  Cassandra,
  MSSQL,
  MariaSQL,
  MySQL,
  PLSQL,
  PostgreSQL,
  SQLDialect,
  SQLite,
  StandardSQL,
  keywordCompletion,
  schemaCompletion,
  SQLConfig,
} from "@codemirror/lang-sql"

export interface SqlProps extends CommonProps {
  language: "sql"
  langOptions?: SQLConfig
}

export default function sql(config: SQLConfig) {
  if (!config.schema) {
    config.schema = {}
  }

  let lang = config.dialect || StandardSQL
  return new LanguageSupport(lang.language, [
    schemaCompletion(config),
    keywordCompletion(lang, !!config.upperCaseKeywords),
    // handleFormat(),
    // StateEffect
    // new Facet(),
  ])
}

export {
  sql,
  SQLConfig,
  Cassandra,
  MSSQL,
  MariaSQL,
  MySQL,
  PLSQL,
  PostgreSQL,
  SQLDialect,
  SQLite,
  StandardSQL,
}
