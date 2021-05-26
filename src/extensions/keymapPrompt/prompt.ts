import {
  combineConfig,
  Extension,
  Facet,
  StateEffect,
} from "@codemirror/state"
import { ViewPlugin, ViewUpdate, EditorView } from "@codemirror/view"

type KeymapPromptConfig = {
  placement: string
}

export const keymapPromptConfig = Facet.define<
  KeymapPromptConfig,
  KeymapPromptConfig
>({
  combine(KeymapPromptConfigs) {
    return combineConfig(KeymapPromptConfigs, {
      placement: "leftbottom",
    })
  },
})

export const setPromptText = StateEffect.define<string | null>({
  map: (value) => value ?? "",
})

const prompt = ViewPlugin.fromClass(
  class {
    dom: HTMLElement
    view: EditorView
    timer: NodeJS.Timeout

    constructor(view: EditorView) {
      this.view = view
    }

    update(update: ViewUpdate) {
      const { transactions } = update

      for (let index = 0; index < transactions.length; index++) {
        const { effects } = transactions[index]

        for (let index = 0; index < effects.length; index++) {
          const effect = effects[index]

          if (effect.is(setPromptText) && effect.value) {
            this.init()
            this.attach(effect.value)
            break
          }
        }
      }
    }

    init() {
      const dom = document.createElement("div")
      dom.classList.add("cm-keymap-prompt")
      dom.setAttribute(
        "style",
        `position: absolute;
         width: 200px;
         height: 60px;
         background: black;
         opacity: 0;
         bottom: 24px;
         right: 24px;
         border-radius: 8px;
         opacity: 0;
         transition: opacity 0.2s
         `
      )
      dom.addEventListener("transitionend", this.onAninationEnd)
      this.view.scrollDOM.appendChild(dom)
      this.dom = dom

      this.setupTimer()
    }

    attach(promptText: string) {
      // fadein
      this.dom.style.opacity = "0.8"
      this.dom.innerText = promptText
    }

    detach() {
      // fadeout
      this.dom.style.opacity = "0"
    }

    setupTimer() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.detach()
      }, 2000)
    }

    onAninationEnd = () => {
      this.dom.removeEventListener(
        "transitionend",
        this.onAninationEnd
      )
      this.view.scrollDOM.removeChild(this.dom)
    }

    destory() {
      this.detach()
    }
  }
)

export default function keymapPrompt(
  config: KeymapPromptConfig
): Extension {
  return [keymapPromptConfig.of(config), prompt]
}
