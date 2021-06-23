import { Extension } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

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
      const scrollTop = view.scrollDOM.scrollTop
      const clientHeight = view.scrollDOM.clientHeight
      const scrollHeight = view.scrollDOM.scrollHeight

      if (scrollTop + clientHeight === scrollHeight) {
        onScrollToBottom?.()
      }

      if (scrollTop === 0) {
        onScrollToTop?.()
      }
    },
  })
}
