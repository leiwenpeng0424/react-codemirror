import { LanguageSupport } from "@codemirror/language"
import { CommonProps } from "../ReactCodemirrorNew"
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
import { ViewUpdate } from "@codemirror/view"
import { Extension, Facet } from "@codemirror/state"

export interface SqlProps extends CommonProps {
  language: "sql"
  langOptions?: SQLConfig
}

function handleFormat(): Extension {
  // return (view: ViewUpdate) => {
  //   return new Facet().of(() => {
  //
  //   })
  // }
}

export default function sql(config: SQLConfig) {
  if (!config.schema) {
    config.schema = {}
  }

  let lang = config.dialect || StandardSQL
  return new LanguageSupport(lang.language, [
    schemaCompletion(config),
    keywordCompletion(lang, !!config.upperCaseKeywords),
    handleFormat(),
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
