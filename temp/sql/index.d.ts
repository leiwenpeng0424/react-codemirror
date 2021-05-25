import { LanguageSupport } from "@codemirror/language";
import { CommonProps } from "../ReactCodemirror";
import { StandardSQL, schemaCompletion, SQLConfig } from "@codemirror/lang-sql";
export interface SqlProps extends CommonProps {
    language: "sql";
    langOptions?: SQLConfig;
}
export default function sql(config?: SQLConfig): LanguageSupport;
export { sql, SQLConfig, StandardSQL, schemaCompletion };
