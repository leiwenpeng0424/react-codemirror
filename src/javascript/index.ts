import { javascript } from "@codemirror/lang-javascript"
import { CommonProps } from "../ReactCodemirror"

export interface JavascriptProps extends CommonProps {
  language: "javascript"
  langOptions?: {
    jsx?: boolean
    typescript?: boolean
  }
}

export default javascript
