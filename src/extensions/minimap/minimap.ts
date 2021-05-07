import { EditorView } from "@codemirror/view"
import { CanvasElement, MinimapElement, Viewbox } from "./elements"
import { Drawer } from "./drawer"

export default class Minimap {
  view: EditorView
  minimap: MinimapElement
  canvas: CanvasElement
  viewbox: Viewbox
  drawer: Drawer
  constructor(view) {
    this.view = view
    this.minimap = new MinimapElement(view)
    this.canvas = new CanvasElement(this.minimap.node)
    this.viewbox = new Viewbox(this.minimap.node)
    this.drawer = new Drawer(view, this.canvas.ctx)
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
    this.drawer.draw(view ? view : this.view)
  }
}
