/// @folk https://github.com/codemirror/lang-sql/blob/main/src/complete.ts
import {
  Completion,
  CompletionContext,
  CompletionSource,
} from "@codemirror/autocomplete"
import { EditorState } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"
import { SyntaxNode, Tree, TreeCursor } from "lezer"
import { sqlAnalysisField, SqlAnalysis } from "./analysis"
import { EditorView } from "@codemirror/view"
import {
  HitPathCompletion,
  snippetsFacet,
} from "../extensions/snippets"

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

function beforePosToken(
  state: EditorState,
  from: number,
  to: number
): {
  from: number
  to: number
  text: string
  cursorFrom: number
} {
  let textAtPos = state.doc.sliceString(from, to)
  while (to <= 0 || textAtPos == " ") {
    to = from
    from -= 1
    textAtPos = state.doc.sliceString(from, to)
  }

  const node = syntaxTree(state).cursor(from, -1)

  return {
    text: state.doc.sliceString(node.from, node.to),
    from: node.from,
    to: node.to,
    cursorFrom: from,
  }
}

function transferTableSourceToCompletions(source: SqlAnalysis): {
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

function increaseUsageCountApply(
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

function rearrangeOptionsByContext(
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
      apply: increaseUsageCountApply,
    })),
    ...output.map((put) => ({
      ...put,
      boost: baseBoost + 1 + (usageStack[put.label] ?? 0),
      apply: increaseUsageCountApply,
    })),
  ]
}

/// 按照pos往前一个一个地截取字符，直到遇到匹配地补全。
function tokenBeforePos(
  state: EditorState,
  pos: number
): {
  node: {
    from: number
    to: number
    value: string
    cursor: TreeCursor
  }
} {
  let char: string = state.doc.sliceString(pos - 1, pos)

  while (char === " ") {
    pos--
    char = state.doc.sliceString(pos - 1, pos)
  }

  const cursor: TreeCursor = syntaxTree(state).cursor(pos, -1)

  return {
    node: {
      value: state.doc.sliceString(cursor.from, cursor.to),
      from: pos - 1,
      to: pos,
      cursor,
    },
  }
}

function getTokenNameByPos(
  state: EditorState,
  from: number,
  to: number
): string {
  return state.doc.sliceString(from, to)
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
    /// 补充代码段补全到CompletionResult
    const snippets = context.state.facet(snippetsFacet)
    const localTableSource = context.state.field(sqlAnalysisField)
    const localSchema =
      transferTableSourceToCompletions(localTableSource)
    const localOptions = Object.keys(localTableSource).map(
      (name) => ({ label: name, type: "property" } as Completion)
    )

    byTable = Object.assign({}, byTable, localSchema)

    const { parent, from, quoted, empty } = sourceContext(
      context.state,
      context.pos
    )
    if (empty && !context.explicit) {
      let targetOptions: HitPathCompletion = snippets
      let node = tokenBeforePos(context.state, context.pos).node

      while (
        targetOptions[node.value] &&
        !Array.isArray(targetOptions[node.value])
      ) {
        const char = getTokenNameByPos(
          context.state,
          node.cursor.from,
          node.cursor.to
        )
        node = tokenBeforePos(context.state, node.from).node
        targetOptions = targetOptions[char] as HitPathCompletion
      }

      const options = targetOptions[node.value] as Completion[]

      console.log(options)

      // if (textAtPos === "=") {
      //   /// get token name at operator-left-side
      //   textAtPos = context.state.doc.sliceString(
      //     textFrom - 1,
      //     textFrom
      //   )
      //   while (textTo <= 0 || textAtPos == " ") {
      //     textTo = textFrom
      //     textFrom -= 1
      //     textAtPos = context.state.doc.sliceString(textFrom, textTo)
      //   }
      //
      //   const node = syntaxTree(context.state).cursor(textFrom, -1)
      //   textAtPos = context.state.doc
      //     .sliceString(node.from, node.to)
      //     .toLowerCase()
      //
      //   if (textAtPos === "type") {
      //     return {
      //       from,
      //       to: context.pos,
      //       options: [
      //         {
      //           label: "kafka",
      //           info: "kafka data type",
      //           apply: `'kafka', \n   bootstrapServers = '',
      // offsetReset = '',
      // groupID = '',
      // zookeeperQuorum = '',
      // topic = '',
      // ---topic = 'mqTest.*',
      // ---topicIsPattern = 'true',
      // parallelism = 1`,
      //         },
      //         {
      //           label: "PG",
      //           info: "example completion for create table from type PG",
      //         },
      //       ],
      //       span: Span,
      //     }
      //   }
      //
      //   return null
      // }
      //
      // const node = syntaxTree(context.state).cursor(textFrom, -1)
      //
      // textAtPos = context.state.doc
      //   .sliceString(node.from, node.to)
      //   .toLowerCase()
      //
      // if (from - textFrom <= 1) {
      //   return null
      // }
      //
      // if (textAtPos === "into") {
      //   return {
      //     from,
      //     to: context.pos,
      //     options: maybeQuoteCompletions(
      //       quoted,
      //       rearrangeOptionsByContext(topOptions, localOptions)
      //     ),
      //     span: Span,
      //   }
      // }
      //
      // if (textAtPos === "from") {
      //   return {
      //     from,
      //     to: context.pos,
      //     options: maybeQuoteCompletions(
      //       quoted,
      //       rearrangeOptionsByContext(localOptions, topOptions)
      //     ),
      //     span: Span,
      //   }
      // }

      return null
    }

    let options = topOptions
    options = options.concat(snippets[""])
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
