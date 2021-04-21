import { sql, SQLConfig } from "@codemirror/lang-sql"
import { CommonProps } from "../ReactCodemirrorNew"

export interface SqlProps extends CommonProps {
  language: "sql"
  langOptions?: SQLConfig
}

export default sql
