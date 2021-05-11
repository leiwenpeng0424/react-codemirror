import { EditorView } from "@codemirror/view"
import { syntaxTree } from "@codemirror/language"
import { CanvasElement, MinimapElement, Viewbox } from "./elements"
import { Drawer } from "./drawer"
import TokenCache from "./cache"
export default class Minimap {
  view: EditorView
  minimap: MinimapElement
  canvas: CanvasElement
  viewbox: Viewbox
  drawer: Drawer
  cache: TokenCache
  constructor(view: EditorView) {
    this.view = view
    this.cache = new TokenCache()
    this.minimap = new MinimapElement(view)
    this.canvas = new CanvasElement(this.minimap.node)
    this.viewbox = new Viewbox(this.minimap.node)
    this.drawer = new Drawer(view, this.canvas.ctx, this.cache)
  }

  resize(width: number, height: number): void {
    this.minimap.resize(width, height)
    this.canvas.resize(width, height)
    this.viewbox.resize(width, height)
  }

  setBackground(bg: string): void {
    this.minimap.setBackground(bg)
  }

  // move .cm-minimap under .cm-editor
  detach(): Minimap {
    const panels = this.view.dom.querySelector(".cm-panels")
    this.view.dom.removeChild(panels)
    return this
  }

  attach(): Minimap {
    this.view.dom.appendChild(this.minimap.node)
    return this
  }

  render(view?: EditorView): void {
    if (!view) {
      view = this.view
    }

    const cursorLine = view.state.doc.lineAt(
      view.state.selection.main.head
    )

    // clear canvas area below input line
    this.drawer.clear(
      0,
      cursorLine.number * 2,
      80 * 5,
      view.dom.clientHeight
    )

    this.drawer.draw(view ? view : this.view)
  }
}
