import { Tree, NodeType } from "lezer"
import { syntaxTree } from "@codemirror/language"
import {
  EditorState,
  Extension,
  StateEffect,
  StateField,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"

type SqlAnalysis = {
  [tableName: string]: { [columnName: string]: string }[]
}

function walk(
  tree: Tree,
  traveler: {
    [name: string]: (node: NodeType, from: number, to: number) => void
  },
  state: EditorState
) {
  tree.iterate({
    enter(node, from, to) {
      console.log(node, state.doc.sliceString(from, to))

      const travel = traveler[node.name]
      if (travel) {
        travel(node, from, to)
      }
    },
  })
}

function analysis(state: EditorState): SqlAnalysis {
  const sytaxNodes = syntaxTree(state)
  const localSchema: SqlAnalysis = {}
  let hitKeywordTable = false,
    collecttingTableKeys = false
  walk(
    sytaxNodes,
    {
      Keyword: (_node, from, to) => {
        const name = state.doc.sliceString(from, to)
        if (name.toLocaleLowerCase() === "table") {
          hitKeywordTable = true
        }
      },
      Identifier: (_node, from, to) => {
        const name = state.doc.sliceString(from, to)
        if (hitKeywordTable) {
          localSchema[name] = []
          collecttingTableKeys = true
        }
      },
    },
    state
  )

  return {}
}

const sqlAnalysisEffect = StateEffect.define<SqlAnalysis>({})
const sqlAnalysisField = StateField.define<SqlAnalysis>({
  create(state: EditorState) {
    return analysis(state)
  },
  update(value, tr) {
    const { effects } = tr
    return value
  },
})

export default function analysisSql(): Extension {
  return [
    sqlAnalysisField,
    EditorView.updateListener.of(({ docChanged, state, view }) => {
      if (docChanged) {
        const resultTable = analysis(state)
        view.dispatch({
          effects: [sqlAnalysisEffect.of(resultTable)],
        })
      }
    }),
  ]
}
