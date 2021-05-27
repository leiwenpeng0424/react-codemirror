/// @folk https://github.com/codemirror/lang-sql/blob/main/src/complete.ts
import {
  Completion,
  CompletionContext,
  CompletionSource,
} from "@codemirror/autocomplete"
import { EditorState } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"
import { SyntaxNode } from "lezer"
import { sqlAnalysisField, SqlAnalysis } from "./analysis"
import { EditorView } from "@codemirror/view"

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
        parent = stripQuotes(state.sliceDoc(before.from, before.to))
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
        parent: stripQuotes(state.sliceDoc(before.from, before.to)),
        from: startPos,
        quoted: null,
      }
    } else {
      empty = true
    }
  } else {
    empty = true
  }

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

function tranferTableSourceToCompletions(source: SqlAnalysis): {
  [name: string]: Completion[]
} {
  const schema: { [name: string]: Completion[] } = {}

  const tableNames = Object.keys(source)

  tableNames.forEach((name) => {
    if (!schema[name]) {
      schema[name] = []
    }
    for (let index = 0; index < source[name].length; index++) {
      const item = source[name][index]
      if (Object.keys(item).length === 0) {
        break
      }
      schema[name].push({
        label: item.name,
        detail: `from ${name}`,
        info: ``,
        type: "property",
        boost: 2,
      })
    }
  })

  return schema
}

const Span = /^\w*$/,
  QuotedSpan = /^[`'"]?\w*[`'"]?$/

let usageStack: { [key: string]: number } = {}

function increseUsageCountApply(
  view: EditorView,
  completion: Completion,
  from: number,
  to: number
): void {
  if (!usageStack[completion.label]) {
    usageStack[completion.label] = 1
  } else {
    usageStack[completion.label]++
  }

  view.dispatch({
    changes: [
      {
        from,
        to,
        insert: completion.label,
      },
    ],
    selection: {
      anchor: from + completion.label.length,
      head: from + completion.label.length,
    },
  })
}

function rerangeOptionsByContext(
  input: readonly Completion[],
  output: readonly Completion[]
): Completion[] {
  const baseBoost = 0

  /// 重置 Usage
  usageStack = {}

  return [
    ...input.map((put) => ({
      ...put,
      boost: baseBoost + (usageStack[put.label] ?? 0),
      apply: increseUsageCountApply,
    })),
    ...output.map((put) => ({
      ...put,
      boost: baseBoost + 1 + (usageStack[put.label] ?? 0),
      apply: increseUsageCountApply,
    })),
  ]
}

export function completeFromSchema(
  schema: { [table: string]: readonly (string | Completion)[] },
  tables?: readonly Completion[],
  defaultTable?: string
): CompletionSource {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let byTable: { [table: string]: readonly Completion[] } =
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
    const localTableSource = context.state.field(sqlAnalysisField)
    const localSchema =
      tranferTableSourceToCompletions(localTableSource)
    const localOptions = Object.keys(localTableSource).map(
      (name) => ({ label: name, type: "type" } as Completion)
    )

    byTable = Object.assign({}, byTable, localSchema)

    const { parent, from, quoted, empty } = sourceContext(
      context.state,
      context.pos
    )
    if (empty && !context.explicit) {
      let textFrom = context.pos - 1
      let textTo = context.pos
      let textAtPos = context.state.doc.sliceString(textFrom, textTo)
      while (textTo <= 0 || textAtPos == " ") {
        textTo = textFrom
        textFrom -= 1
        textAtPos = context.state.doc.sliceString(textFrom, textTo)
      }

      const node = syntaxTree(context.state).cursor(textFrom, -1)

      textAtPos = context.state.doc
        .sliceString(node.from, node.to)
        .toLowerCase()

      if (from - textFrom <= 1) {
        return null
      }

      if (textAtPos === "into") {
        return {
          from,
          to: context.pos,
          options: maybeQuoteCompletions(
            quoted,
            rerangeOptionsByContext(topOptions, localOptions)
          ),
          span: Span,
        }
      }

      if (textAtPos === "from") {
        return {
          from,
          to: context.pos,
          options: maybeQuoteCompletions(
            quoted,
            rerangeOptionsByContext(localOptions, topOptions)
          ),
          span: Span,
        }
      }

      return null
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
