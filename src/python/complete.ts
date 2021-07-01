import {
  completeFromList,
  Completion,
  ifNotIn,
} from "@codemirror/autocomplete"
import { pythonLanguage } from "@codemirror/lang-python"
import { Extension } from "@codemirror/state"
import { commonBuiltins, commonKeywords } from "./keywords"

const commonCompletions = commonBuiltins
  .concat(commonKeywords)
  .reduce((accu, keyword) => {
    accu[keyword] = keyword
    return accu
  }, {})

/// 从关键字中获取到补全信息
function completeFromKeywords(keywords: { [name: string]: string }) {
  const completions: Completion[] = Object.keys(keywords).map(
    (keyword) => ({
      label: keyword,
      type: "keyword",
      boost: -1,
    })
  )

  return ifNotIn(
    ["Comment", "String", "."],
    completeFromList(completions)
  )
}

export function keywordsCompletions(): Extension {
  return pythonLanguage.data.of({
    autocomplete: completeFromKeywords(commonCompletions),
  })
}
