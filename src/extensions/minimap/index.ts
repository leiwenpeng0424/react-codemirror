import { EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view"
import { Extension, Facet } from "@codemirror/state"
import { Line } from "@codemirror/text"

/**
 * - minimap
 *  - 使用canvas来实现minimap。
 *  - 获取当前的文本，将文本绘制在minimap-canvas上。
 *  - 文本更新的时候，重绘minimap-canvas。
 *  - 设置缓存区来缓存已经创建的颜色块。
 */

type MinimapConfig = {
  // minimap插件会在插入到editor的dom结构中，
  // 使用这个选项来确认是否生成minimal
  minimap?: boolean
  // 是否在minimap中展示精确的文字，或者只是展示颜色块
  explicit?: boolean
  // minimap在editor中展示的位置，左或者右
  left?: boolean
}

// 定义minimapConfig facet
const minimapConfig = Facet.define<MinimapConfig, MinimapConfig>({
  combine(configs: readonly MinimapConfig[]): MinimapConfig {
    let minimap
    let explicit
    let left

    for (const c of configs) {
      minimap = c.minimap
      explicit = c.explicit
      left = c.left
    }

    return { minimap, explicit, left }
  },
})

/**
 * @public Plugin
 *
 * 使用这个Plugin在Editor中生成minimap
 */
const minimapPlugin = ViewPlugin.fromClass(
  class {
    dom: HTMLCanvasElement
    lineCache: Map<number, string>

    constructor(view: EditorView) {
      this.lineCache = new Map()
      const config = view.state.facet(minimapConfig)
      this.render(view)
    }
    update(view: ViewUpdate) {
      if (!view.docChanged) {
        return
      }
      let index = 0

      // 遍历所有的line
      // FIXME 最好是能够只针对变化的行进行重新绘制，边里所有的行，实在是性能太差了

      while (index < view.state.doc.lines) {
        const line = view.state.doc.line(index + 1)
        const cache = this.lineCache.get(index)

        // 相等，就不重绘了。
        if (cache !== line.text) {
          // view.state.
          // 计算绘制的矩形的大小，可以通过比例来计算，ratio = (editor.height / editor)
          const { node, offset } = view.view.domAtPos(index + 1)

          console.log(node, offset)

          console.log(node.childNodes)

          this.dom.getContext("2d").fillRect(1, 1, 100, 1)
          this.lineCache.set(index, line.text)
        }

        index++
      }
    }
    render(view: EditorView) {
      if (!this.dom) {
        this.dom = document.createElement("canvas")
        this.dom.style.background = "blue"
        this.dom.style.height = "100%"
        this.dom.style.width = "120px"
        this.dom.style.position = "sticky"
        this.dom.style.right = "2px"
        this.dom.style.top = "0"
        this.dom.style.bottom = "0"
        this.dom.style.boxShadow = "red 0px 7px 5px"
        view.scrollDOM.appendChild(this.dom)
      }
    }
    // 给格子上色
    syntax({ from, to, color }) {}
  },
  {}
)

export default function minimap(): Extension {
  return [minimapPlugin]
}
