import { combineConfig, Extension, Facet } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

type ScrollConfig = {
  topOffset?: number
  bottomOffset?: number
}

// todo scroll offset， 设置一个fact，可以设置一个滚动偏移量，提前对数据进行加载
export const scrollOptions = Facet.define<ScrollConfig, ScrollConfig>(
  {
    combine(offsets) {
      return combineConfig(offsets, {
        topOffset: 0,
        bottomOffset: 0,
      })
    },
  }
)

export function scrollToEdge({
  onScrollToTop,
  onScrollToBottom,
}: {
  onScrollToTop?: () => void
  onScrollToBottom?: () => void
}): Extension {
  // scroll to edge, top or bottom

  return EditorView.domEventHandlers({
    scroll: (_event, view) => {
      const config = view.state.facet(scrollOptions)

      const { topOffset, bottomOffset } = config

      const scrollTop = view.scrollDOM.scrollTop
      const clientHeight = view.scrollDOM.clientHeight
      const scrollHeight = view.scrollDOM.scrollHeight

      if (scrollTop + clientHeight > scrollHeight - bottomOffset) {
        scrollTop > 0 && onScrollToBottom?.()
      }

      if (scrollTop === topOffset) {
        onScrollToTop?.()
      }
    },
  })
}
