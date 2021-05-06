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

export default function sql(config: SQLConfig = {}) {
  const configs = {
    ...config,
  }

  if (!configs.schema) {
    configs.schema = {}
  }

  let lang = configs.dialect || StandardSQL
  return new LanguageSupport(lang.language, [
    schemaCompletion(configs),
    keywordCompletion(lang, !!configs.upperCaseKeywords),
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
  schemaCompletion,
}
