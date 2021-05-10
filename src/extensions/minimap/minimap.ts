import { EditorView } from "@codemirror/view"
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
  constructor(view) {
    this.view = view
    this.cache = new TokenCache()
    this.minimap = new MinimapElement(view)
    this.canvas = new CanvasElement(this.minimap.node)
    this.viewbox = new Viewbox(this.minimap.node)
    this.drawer = new Drawer(view, this.canvas.ctx, this.cache)
  }

  resize(width: number, height: number) {
    this.minimap.resize(width, height)
    this.canvas.resize(width, height)
    this.viewbox.resize(width, height)
  }

  setBackground(bg: string) {
    this.minimap.setBackground(bg)
  }

  // move .cm-minimap under .cm-editor
  detach() {
    const panels = this.view.dom.querySelector(".cm-panels")
    this.view.dom.removeChild(panels)
    return this
  }

  attach() {
    this.view.dom.appendChild(this.minimap.node)
    return this
  }

  render(view?: EditorView) {
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
