/// @folk https://github.com/codemirror/lang-sql/blob/main/src/complete.ts
import {
  Completion,
  CompletionContext,
  CompletionSource,
} from "@codemirror/autocomplete"
import { EditorState } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"
import { SyntaxNode } from "lezer"

function tokenBefore(tree: SyntaxNode) {
  const cursor = tree.cursor.moveTo(tree.from, -1)
  while (/Comment/.test(cursor.name)) {
    cursor.moveTo(cursor.from, -1)
  }
  return cursor.node
}

function stripQuotes(name: string) {
  const quoted = /^[`'"](.*)[`'"]$/.exec(name)
  return quoted ? quoted[1] : name
}

function sourceContext(
  state: EditorState,
  startPos: number
): {
  parent: null | string
  from: number
  quoted: string | null
  empty?: boolean
} {
  const pos = syntaxTree(state).resolve(startPos, -1)
  let empty = false
  if (pos.name == "Identifier" || pos.name == "QuotedIdentifier") {
    empty = false
    let parent: null | string = null
    const dot = tokenBefore(pos)
    if (dot && dot.name == ".") {
      const before = tokenBefore(dot)
      if (
        (before && before.name == "Identifier") ||
        before.name == "QuotedIdentifier"
      )
        parent = stripQuotes(
          state.sliceDoc(before.from, before.to).toLowerCase()
        )
    }

    return {
      parent,
      from: pos.from,
      quoted:
        pos.name == "QuotedIdentifier"
          ? state.sliceDoc(pos.from, pos.from + 1)
          : null,
    }
  } else if (pos.name == ".") {
    const before = tokenBefore(pos)
    if (
      (before && before.name == "Identifier") ||
      before.name == "QuotedIdentifier"
    ) {
      return {
        parent: stripQuotes(
          state.sliceDoc(before.from, before.to).toLowerCase()
        ),
        from: startPos,
        quoted: null,
      }
    } else {
      empty = true
    }
  } else {
    empty = true
  }

  const prevToken = tokenBefore(pos)
  console.log(prevToken)
  /// TODO 在这里添加特殊补全的逻辑

  return { parent: null, from: startPos, quoted: null, empty }
}

function maybeQuoteCompletions(
  quote: string | null,
  completions: readonly Completion[]
) {
  if (!quote) return completions
  return completions.map((c) => ({
    ...c,
    label: quote + c.label + quote,
    apply: undefined,
  }))
}

const Span = /^\w*$/,
  QuotedSpan = /^[`'"]?\w*[`'"]?$/

export function completeFromSchema(
  schema: { [table: string]: readonly (string | Completion)[] },
  tables?: readonly Completion[],
  defaultTable?: string
): CompletionSource {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const byTable: { [table: string]: readonly Completion[] } =
    Object.create(null)
  for (const table in schema)
    byTable[table] = schema[table].map((val) => {
      return typeof val == "string"
        ? { label: val, type: "property" }
        : val
    })
  const topOptions: readonly Completion[] = (
    tables ||
    Object.keys(byTable).map(
      (name) => ({ label: name, type: "type" } as Completion)
    )
  ).concat((defaultTable && byTable[defaultTable]) || [])

  return (context: CompletionContext) => {
    const { parent, from, quoted, empty } = sourceContext(
      context.state,
      context.pos
    )
    if (empty && !context.explicit) {
      /// TODO 如果遇到了前一个TIKEN是 关键字 `into` 或者 `from` 或者 `table`，就展示待选项
      return {
        from,
        to: context.pos,
        options: maybeQuoteCompletions(quoted, topOptions),
        span: Span,
      }
    }

    let options = topOptions
    if (parent) {
      const columns = byTable[parent]
      if (!columns) return null
      options = columns
    }
    const quoteAfter =
      quoted &&
      context.state.sliceDoc(context.pos, context.pos + 1) == quoted
    return {
      from,
      to: quoteAfter ? context.pos + 1 : undefined,
      options: maybeQuoteCompletions(quoted, options),
      span: quoted ? QuotedSpan : Span,
    }
  }
}
