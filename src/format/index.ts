import { EditorView } from "@codemirror/view"
import {
  Annotation,
  Facet,
  combineConfig,
  StateField,
  Transaction,
} from "@codemirror/state"

/**
 * format 方法接受的参数
 */
export type FormatConfig = {
  parser(text: string): string | Promise<string>
}

/**
 * @method define
 */
const formatDoc = Annotation.define<string>()

const formatEffect = Facet.define()

const formatConfig = Facet.define({
  combine(configs) {
    return combineConfig(
      configs,
      {
        parser: (text: string) => text,
      },
      {}
    )
  },
})

const formatField_ = StateField.define({
  create() {},
  update(state, tr: Transaction) {
    let configs = tr.state.facet(formatConfig)
    const fromFormatDoc = tr.annotation(formatDoc)
    if (fromFormatDoc) {
    }
  },
  toJSON(value) {},
  fromJSON(json) {},
})

function format(configs = {}) {
  return [formatField_, formatConfig.of(configs)]
}

function startFormat(view: EditorView, configs: FormatConfig) {
  const str = configs.parser(view.state.doc.toJSON().join("\n"))

  Promise.resolve(str).then((resolveStr) => {
    view.dispatch({
      // annotations: formatDoc.of(),
      changes: [
        {
          from: 0,
          to: view.state.doc.length,
          insert: resolveStr,
        },
      ],
    })
  })
}

export { format, startFormat }
