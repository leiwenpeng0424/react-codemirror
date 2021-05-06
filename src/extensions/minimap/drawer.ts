import { EditorView } from "@codemirror/view"

export class Drawer {
  view: EditorView
  ctx: RenderingContext

  constructor(view: EditorView, ctx: RenderingContext) {
    this.view = view
    this.ctx = ctx
  }
}
