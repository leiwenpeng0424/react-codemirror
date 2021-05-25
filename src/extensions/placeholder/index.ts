/// placeholder
import { Extension, Facet } from "@codemirror/state"
import { ViewPlugin, EditorView, ViewUpdate } from "@codemirror/view"

const textOfPlaceholder = Facet.define<string[], string[]>({
  combine(input) {
    return input[input.length - 1]
  },
})

const placeholderPlguin = ViewPlugin.fromClass(
  class {
    view: EditorView
    dom: HTMLDivElement

    constructor(view: EditorView) {
      this.view = view
      this.dom = this.initPlaceholderMask(view)
      this.updateMaskOverlayer(view.state.facet(textOfPlaceholder))
    }

    update(update: ViewUpdate) {
      if (update.docChanged && update.state.doc.length === 0) {
        this.updateMaskOverlayer(
          this.view.state.facet(textOfPlaceholder)
        )
      }

      if (update.state.doc.length !== 0) {
        this.dom.innerHTML = ""
      }
    }

    destory() {
      this.view.dom.removeChild(this.dom)
    }

    initPlaceholderMask(view: EditorView): HTMLDivElement {
      const mask = document.createElement("div")
      mask.classList.add("cm-placeholder-mask")
      view.scrollDOM.appendChild(mask)

      return mask
    }

    updateMaskOverlayer(text: string | string[]) {
      if (typeof text === "string") {
        this.dom.innerText = text
      } else {
        this.dom.innerHTML = text
          .map((str) => {
            return `<div class="cm-line">${str}</div>`
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
  placeholdertext: string[]
): Extension {
  return [
    textOfPlaceholder.of(placeholdertext),
    placeholderPlguin,
    baseTheme,
  ]
}
