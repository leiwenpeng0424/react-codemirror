/// placeholder
import { Extension, Facet } from "@codemirror/state"
import { ViewPlugin, EditorView, ViewUpdate } from "@codemirror/view"

const textOfPlaceholder = Facet.define<string[], string[]>({
  combine(input) {
    return input[input.length - 1]
  },
})

const placeholderPlugin = ViewPlugin.fromClass(
  class {
    view: EditorView
    dom: HTMLDivElement
    placeholder: string | string[] | undefined

    constructor(view: EditorView) {
      this.view = view

      this.placeholder = view.state.facet(textOfPlaceholder)

      if (!this.placeholder) {
        return
      }

      this.dom = this.initPlaceholderMask(view)
      this.updateMaskOverlay(this.placeholder)
    }

    update(update: ViewUpdate) {
      if (update.docChanged && update.state.doc.length === 0) {
        if (!this.placeholder) {
          return
        }

        this.updateMaskOverlay(
          this.view.state.facet(textOfPlaceholder)
        )
      }

      if (update.state.doc.length !== 0 && this.dom) {
        this.dom.innerHTML = ""
      }
    }

    focus() {
      this.view.contentDOM.focus()
    }

    bindClickEvent(dom: HTMLElement) {
      dom.addEventListener("click", this.focus.bind(this))
    }

    destory() {
      this.view.dom.removeChild(this.dom)
    }

    initPlaceholderMask(view: EditorView): HTMLDivElement {
      const mask = document.createElement("div")
      mask.classList.add("cm-placeholder-mask")
      view.scrollDOM.appendChild(mask)
      this.bindClickEvent(mask)
      return mask
    }

    updateMaskOverlay(text: string | string[]) {
      if (typeof text === "string") {
        this.dom.innerText = text
      } else {
        this.dom.innerHTML = text
          .map((str) => {
            return `<div class="cm-line" style="cursor: text" >${str}</div>`
          })
          .join("")
      }
    }
  },
  {}
)

const baseTheme = EditorView.baseTheme({
  ".cm-placeholder-mask": {
    position: "absolute",
    top: 0,
    left: "30px",
    lineHeight: 1.9,
    opacity: 0.4,
  },
})

export default function placeholder(
  placeholderText: string[]
): Extension {
  return [
    textOfPlaceholder.of(placeholderText),
    placeholderPlugin,
    baseTheme,
  ]
}
