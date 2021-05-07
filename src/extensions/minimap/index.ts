import { showPanel, Panel } from "@codemirror/panel"
import {
  Facet,
  StateEffect,
  StateField,
  Transaction,
} from "@codemirror/state"
import { EditorView, ViewUpdate } from "@codemirror/view"
import Minimap from "./minimap"
// import { CanvasElement, Viewbox, MinimapElement } from "./elements"

/**
 * - minimap
 *  - 使用canvas来实现minimap。
 *  - 获取当前的文本，将文本绘制在minimap-canvas上。
 *  - 文本更新的时候，重绘minimap-canvas。
 *  - 设置缓存区来缓存已经创建的颜色块。
 */

type MinimapConfig = {
  /// minimap插件会在插入到editor的dom结构中，
  /// 使用这个选项来确认是否生成minimal
  minimap?: boolean
  /// minimap的宽度
  minimapWidth?: number
  /// minimap在editor中展示的位置
  minimapSide?: "left" | "right"
}

const minimapConfig = Facet.define<MinimapConfig, MinimapConfig>({
  combine(configs: MinimapConfig[]) {
    let minimap: boolean,
      minimapWidth: number,
      minimapSide: "left" | "right"

    for (const config of configs) {
      minimap = config.minimap
      minimapWidth = config.minimapWidth
      minimapSide = config.minimapSide
    }

    return {
      minimap: minimap,
      minimapSide: minimapSide || "left",
      minimapWidth: minimapWidth || 80,
    }
  },
})

const createMinimapPanel = (view: EditorView): Panel => {
  const config = view.state.facet(minimapConfig)
  const minimapPanel = new Minimap(view)

  return {
    top: true,
    dom: minimapPanel.minimap.node,
    update(update: ViewUpdate) {
      if (update.docChanged) {
        minimapPanel.drawer.clear(
          0,
          0,
          config.minimapWidth * 5,
          view.dom.clientHeight
        )
        minimapPanel.render(update.view)
      }
    },
    mount() {
      view.requestMeasure({
        write() {
          // FIXME 读取minimap是否是打开状态，是的话，才进行read方法里面的操作
        },
        read(view) {
          minimapPanel.resize(
            config.minimapWidth,
            view.dom.clientHeight
          )
          minimapPanel.detach().attach()
          minimapPanel.minimap.setSide(config.minimapSide)
          minimapPanel.render()
        },
      })
    },
  }
}

const toggleMinimap = StateEffect.define<boolean>()

const minimap = StateField.define<boolean>({
  create() {
    return true
  },
  update(update, tr: Transaction) {
    for (let e of tr.effects)
      if (e.is(toggleMinimap)) update = e.value

    return update
  },
  provide(field) {
    return showPanel.from(field, (show) =>
      show ? createMinimapPanel : null
    )
  },
})

export default [
  minimap,
  EditorView.theme({
    ".cm-panel": {
      backgroundColor: "#21252b",
      color: "#abb2bf",
    },
  }),
]
