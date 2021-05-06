import { EditorView } from "@codemirror/view"

export class Viewbox {
  node: HTMLElement
  constructor(parent: HTMLElement) {
    this.node = document.createElement("div")
  }

  appendStyle(cssStyle: CSSStyleDeclaration) {
    for (const prop in cssStyle) {
      this.node.style[prop] = cssStyle[prop]
    }
  }

  scroll(scrollTop: number) {
    this.node.style.transform = `translateY(${Math.round(
      scrollTop
    )}px)`
  }

  hide() {
    this.node.style.visibility = "0"
  }

  show() {
    this.node.style.visibility = "1"
  }

  resize(width: number, height: number) {
    this.node.style.width = String(width) + "px"
    this.node.style.height = String(height) + "px"
  }

  attach(parent: HTMLElement) {
    parent.appendChild(this.node)
  }
}

export class CanvasElement {
  node: HTMLCanvasElement
  ctx: RenderingContext
  constructor(parent: HTMLElement) {
    this.initLayer()
    this.attachCanvasLayer(parent)
  }

  attachCanvasLayer(parent: HTMLElement) {
    parent.appendChild(this.node)
  }

  initLayer() {
    this.node = document.createElement("canvas")
    this.ctx = this.node.getContext("2d")
    this.node.className = "cm-minimap-layer"
    this.node.style.zIndex = "0"
  }

  resize(width: number, height: number) {
    this.node.style.width = String(width) + "px"
    this.node.style.height = String(height) + "px"
  }
}

export class MinimapElement {
  view: EditorView
  node: HTMLElement
  width: number
  height: number
  attached: boolean
  constructor(view: EditorView) {
    this.view = view
    this.node = document.createElement("div")
    this.node.className = "cm-minimap"
    this.view.dom.style.overflow = "hidden"
  }
  resize(width: number, height: number) {
    if (width != this.width)
      this.node.style.width = String(width) + "px"
    if (height != this.height)
      this.node.style.height = String(height) + "px"
    this.width = width
    this.height = height
  }
  setSide(side: "left" | "right") {
    this.view.dom.style.flexDirection =
      side === "left" ? "row-reverse" : "row"
  }
  setBackground(bg: string) {
    this.node.style.background = bg
  }
}
