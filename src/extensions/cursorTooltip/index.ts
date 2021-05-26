import { syntaxTree } from "@codemirror/language"
import { Tree, SyntaxNode } from "lezer"
import { hoverTooltip } from "@codemirror/tooltip"
import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

function tokenAt(tree: Tree, pos: number, side): SyntaxNode {
  console.log(tree.resolve(pos, side))
  const node = tree.resolve(pos, side)

  /// 只对Identifier做一个hover提示
  if (node.name === "Identifier") {
    /// read context data from stateField
  }

  return node
}

const hoverField = hoverTooltip(
  (view, pos, side) => {
    const token = tokenAt(syntaxTree(view.state), pos, side)

    return {
      pos,
      above: true,
      strictSide: false,
      class: "cm-cursor-tooltip",
      create: () => {
        const dom = document.createElement("div")
        dom.textContent = view.state.doc.sliceString(
          token.from,
          token.to
        )
        return { dom }
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
    // transform: "translate(-50%, -7px)",
    border: "none",
    padding: "4px 8px",
    // borderRadius: "2px",
    // "&:before": {
    //   position: "absolute",
    //   content: '""',
    //   left: "50%",
    //   marginLeft: "-5px",
    //   bottom: "-5px",
    //   borderLeft: "5px solid transparent",
    //   borderRight: "5px solid transparent",
    //   borderTop: "5px solid #222",
    // },
  },
})

export function cursorTooltip(): Extension {
  return [hoverField, cursorTooltipBaseTheme]
}
