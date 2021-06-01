import { Tree, NodeType } from "lezer"
import { syntaxTree } from "@codemirror/language"
import {
  EditorState,
  Extension,
  StateEffect,
  StateField,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"

type PrevNode = {
  node: NodeType
  from: number
  to: number
}

export type SqlAnalysis = {
  [tableName: string]: { [columnName: string]: string }[]
}

function walk(
  tree: Tree,
  traveler: {
    [name: string]: (
      node: NodeType,
      from: number,
      to: number,
      lastNode: PrevNode
    ) => void
  }
) {
  let lastNode: PrevNode

  tree.iterate({
    enter(node, from, to) {
      const travel = traveler[node.name]
      if (travel) {
        travel(node, from, to, lastNode)
      }

      lastNode = { node, from, to }
    },
  })
}

function analysis(state: EditorState): SqlAnalysis {
  const syntaxNodes = syntaxTree(state)

  const localTableInfos: {
    [name: string]: {
      [key: string]: string
    }[]
  } = {}
  let activeTable: null | string = null
  let activeTableKey: null | string = null
  let activeTableKeyType: null | string = null

  walk(syntaxNodes, {
    Identifier(
      _node,
      from,
      to,
      { node: prevNode, from: prevFrom, to: prevTo }
    ) {
      const tokenName = state.doc.sliceString(from, to)
      if (
        prevNode.name.toLowerCase() === "keyword" &&
        state.doc.sliceString(prevFrom, prevTo).toLowerCase() ===
          "table"
      ) {
        localTableInfos[tokenName] = []
        activeTable = tokenName
        activeTableKey = null
        activeTableKeyType = null
      } else {
        if (activeTable && activeTableKey) {
          const info: { key?: string; type?: string } = {}
          info.key = activeTableKey
          info.type = tokenName
          activeTableKeyType = tokenName
        }

        if (activeTable && !activeTableKey) {
          activeTableKey = tokenName
        }
      }
    },
    Type(_node, from, to) {
      const tokenName = state.doc.sliceString(from, to)
      if (activeTable && activeTableKey && !activeTableKeyType) {
        activeTableKeyType = tokenName
      }
    },
    String(_node, from, to) {
      const tokenName = state.doc.sliceString(from, to)
      if (activeTable && activeTableKey && !activeTableKeyType) {
        activeTableKeyType = tokenName
      }
    },
    Punctuation(_node, from, to) {
      const tokenName = state.doc.sliceString(from, to)

      if (tokenName === ",") {
        if (activeTableKey && activeTableKeyType) {
          localTableInfos[activeTable].push({
            name: activeTableKey,
            type: activeTableKeyType,
          })
          activeTableKey = null
          activeTableKeyType = null
        }
      }
    },
    ")"() {
      if (activeTableKey && activeTableKeyType) {
        localTableInfos[activeTable].push({
          name: activeTableKey,
          type: activeTableKeyType,
        })
        activeTableKey = null
        activeTableKeyType = null
      }
    },
    Statement() {
      /// 新的语句开始，重置参数
      if (activeTable) {
        activeTable = null
        activeTableKey = null
        activeTableKeyType = null
      }
    },
    Keyword(_node, from, to) {
      const tokenName = state.doc.sliceString(from, to)

      if (tokenName.toLowerCase() === "with") {
        if (activeTable && !activeTableKey && !activeTableKeyType) {
          localTableInfos[activeTable].push({})
        }
      }
    },
  })

  return localTableInfos
}

export const sqlAnalysisEffect = StateEffect.define<SqlAnalysis>({})
export const sqlAnalysisField = StateField.define<SqlAnalysis>({
  create(state: EditorState) {
    return analysis(state)
  },
  update(value, { effects }) {
    for (let i = 0; i < effects.length; i++) {
      const effect = effects[i]

      if (effect.is(sqlAnalysisEffect)) {
        return effect.value
      }
    }

    return value
  },
})

// 分析sql存在的问题，将检查到的错误更新到页面上，
// gutter marker 还是 Diagnostic ？
// const SqlAnalysisPlugin = ViewPlugin.fromClass(
//   class {
//     errors: []
//     warnings: []
//     constructor() {
//       //
//     }
//     update() {
//       //
//     }
//     destory() {
//       //
//     }
//   },
//   {}
// )

export default function analysisSql(): Extension {
  let timer = null
  return [
    sqlAnalysisField,
    EditorView.updateListener.of(({ docChanged, state, view }) => {
      if (docChanged) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }

        const resultTable = analysis(state)

        timer = setTimeout(() => {
          view.dispatch({
            effects: [sqlAnalysisEffect.of(resultTable)],
          })
        }, 400)
      }
    }),
  ]
}
