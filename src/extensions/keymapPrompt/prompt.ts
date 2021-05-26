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

/// 设置prompt的文字，展示在编辑器右下角
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
            if (this.timer) {
              this.setupTimer()
            } else {
              this.init()
            }

            this.attach(effect.value)
            break
          }
        }
      }
    }

    init() {
      const dom = document.createElement("div")
      dom.classList.add("cm-keymap-prompt")
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
      clearTimeout(this.timer)
      this.timer = null
    }

    destory() {
      this.detach()
    }
  }
)

const propmtBaseTheme = EditorView.baseTheme({
  ".cm-keymap-prompt": {
    position: "absolute",
    width: "auto",
    height: "60px",
    background: "black",
    opacity: 0,
    bottom: "24px",
    right: "24px",
    borderRadius: "8px",
    transition: "opacity 0.2s",
    textAlign: "center",
    lineHeight: "60px",
    fontSize: "20px",
    padding: "0 16px",
  },
})

export default function keymapPrompt(
  config: KeymapPromptConfig
): Extension {
  return [keymapPromptConfig.of(config), prompt, propmtBaseTheme]
}
