import { syntaxTree } from "@codemirror/language"
import { Tree, SyntaxNode } from "lezer"
import { hoverTooltip } from "@codemirror/tooltip"
import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { sqlAnalysisField } from "../../sql/analysis"

const stripQuote = (str: string): string =>
  /^[`'"](.*)[`'"]$/.exec(str)?.[1] ?? str

function tokenAt(tree: Tree, pos: number, side): SyntaxNode {
  const node = tree.resolve(pos, side)

  /// 只对Identifier做一个hover提示
  if (node.name === "Identifier") {
    /// read context data from stateField
  }

  return node
}

const createHead = (text: string, cls = "cm-hover-tooltip-head") => {
  const head = document.createElement("div")
  head.classList.add(cls)
  head.innerText = text
  return head
}

const createbody = (
  body: Record<string, string>[],
  cls = "cm-hover-tooltip-body"
) => {
  const b = document.createElement("div")
  b.classList.add(cls)

  const bodyHtml = body
    .map((item) => {
      return `
      <div class='cm-hover-tooltip-item'>
        <span>${item.name}</span>
        <span style='color: gray;margin-left: 6px;display:inline-block'>${
          stripQuote(item.type)?.toLowerCase() ?? "-"
        }</span>
      </div>`
    })
    .join("")

  b.innerHTML = bodyHtml

  return b
}

const hoverField = hoverTooltip(
  (view, pos, side) => {
    const token = tokenAt(syntaxTree(view.state), pos, side)
    const tokenName = view.state.doc.sliceString(token.from, token.to)

    const localTableSource = view.state.field(sqlAnalysisField)

    const dataSource = localTableSource[tokenName]
    if (!dataSource) {
      return null
    }

    return {
      pos,
      above: true,
      strictSide: false,
      class: "cm-cursor-tooltip",
      create: (view: EditorView) => {
        const localTableSource = view.state.field(sqlAnalysisField)

        if (localTableSource[tokenName]) {
          const dom = document.createElement("div")
          const tableSource = localTableSource[tokenName]
          const head = createHead(tokenName)
          const body = createbody(tableSource)
          dom.appendChild(head)
          dom.appendChild(body)
          return {
            dom,
          }
        }

        return null
      },
    }
  },
  {
    hideOnChange: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    hoverTime: -1,
  }
)

const cursorTooltipBaseTheme = EditorView.baseTheme({
  ".cm-tooltip.cm-cursor-tooltip": {
    backgroundColor: "#222",
    color: "white",
    border: "none",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "14px",
  },
  ".cm-hover-tooltip-head": {
    fontSize: "14px",
    borderBottom: "1px solid gray",
    color: "gray",
    padding: "4px 0",
  },
  ".cm-hover-tooltip-item": {
    display: "flex",
    justifyContent: "space-between",
    padding: "1px",
  },
})

export function cursorTooltip(): Extension {
  return [hoverField, cursorTooltipBaseTheme]
}
