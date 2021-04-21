import { json } from "@codemirror/lang-json"
import { CommonProps } from "../ReactCodemirrorNew"

export interface JsonProps extends CommonProps {
  language: "json"
  langOptions?: never
}

export default json
