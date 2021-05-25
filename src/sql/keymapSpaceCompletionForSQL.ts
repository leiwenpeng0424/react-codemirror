import { Tree, NodeType } from "lezer"
import { syntaxTree } from "@codemirror/language"
import { keymap } from "@codemirror/view"
import { SQLDialect } from "@codemirror/lang-sql"
import { Extension } from "@codemirror/state"
import {
  CompletionContext,
  CompletionResult,
  startCompletion,
} from "@codemirror/autocomplete"

/// schema completion refactory
/// [@codemirror/lang-sql]本身带的schema自动补全不支持输入空格的时候展示补全

function walkTree(
  tree: Tree,
  traveler: {
    [key: string]: (
      nodeType: NodeType,
      from: number,
      to: number
    ) => void
  }
) {
  tree.iterate({
    enter(type, from, to) {
      if (type.name in traveler) {
        traveler[type.name]?.(type, from, to)
      }
    },
  })
}

function completionFromSpace(): (
  ctx: CompletionContext
) => CompletionResult {
  let hitCreateKeyword = false
  let completions: string[] = []

  return (context: CompletionContext) => {
    completions = []
    const tree = syntaxTree(context.state)

    walkTree(tree, {
      Identifier: (_node, from, to) => {
        const name = context.state.doc.sliceString(from, to)
        if (hitCreateKeyword) {
          completions.push(name)
          hitCreateKeyword = false
        }
      },
      Keyword: (_node, from, to) => {
        const name = context.state.doc.sliceString(from, to)
        hitCreateKeyword = name.toLowerCase() === "table"
      },
    })

    return {
      from: context.pos,
      to: context.pos + 1,
      options: completions.map((complete) => ({ label: complete })),
      span: /\w*/,
    }
  }
}

export default function spaceCompletion(
  dialect: SQLDialect
): Extension {
  return [
    keymap.of([
      {
        key: "Space",
        run: startCompletion,
      },
    ]),
    dialect.language.data.of({
      autocomplete: completionFromSpace(),
    }),
  ]
}
