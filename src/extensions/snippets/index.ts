import { Completion, snippet } from "@codemirror/autocomplete"
import { Facet } from "@codemirror/state"

/// 创建一个通用的snippets管理，包括后端提出的针对某些独立字段的提示
/// 例如 输入 type = 之后，需要在敲了等于号，然后敲了回车之后提示type可以用的选项
/// 仙子设计一个新的字段，hit，通过-连接该补全出现的必要条件，
/// label 为 kafka 的snippet不全只有在满足了 "type-=" 之后才会触发

export type Snippet = {
  label: Completion["label"]
  info: Completion["info"]
  template: string
  hit?: string
}

function transferSnippetToCompletion(
  snippets: Snippet[]
): HitPathCompletion {
  const snippetsResult: HitPathCompletion = {
    "": [],
  }

  snippets.forEach((snip) => {
    const snippetConfig = {
      label: snip.label,
      info: snip.info,
      apply: snippet(snip.template),
    }

    if (snip.hit) {
      //

      const hitKeywords = snip.hit.split("-").reverse()

      let tempMap: HitPathCompletion

      if (!snippetsResult[hitKeywords[0]]) {
        tempMap = snippetsResult[hitKeywords[0]] = {}
      } else {
        tempMap = snippetsResult[hitKeywords[0]]
      }

      hitKeywords.slice(1).forEach((keyword, index) => {
        if (!tempMap[keyword]) {
          tempMap[keyword] = []
        }
        if (index === hitKeywords.length - 2) {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(tempMap[keyword] as Completion[]).push(snippetConfig)
        } else {
          tempMap = tempMap[keyword] = {}
        }
      })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(<Completion[]>snippetsResult[""]).push(snippetConfig)
    }
  })

  console.log(snippetsResult)

  return snippetsResult
}

export type HitPathCompletion =
  | {
      [hitPath: string]: HitPathCompletion
    }
  | Completion[]

export const snippetsFacet = Facet.define<
  Snippet[],
  HitPathCompletion
>({
  combine(value) {
    if (value.length) {
      return transferSnippetToCompletion(value.slice(-1)[0])
    }

    return []
  },
})
