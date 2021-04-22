import { EditorView } from "@codemirror/view"
import {
  Annotation,
  Facet,
  combineConfig,
  StateField,
  Transaction,
} from "@codemirror/state"

export type FormatConfig = {
  parser<T, O extends unknown>(text: T, configs?: O): T
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
  const str = configs.parser(view.state.doc.toJSON().join(""))

  view.dispatch({
    annotations: formatDoc.of(str),
    changes: [
      {
        from: 0,
        to: view.state.doc.length,
        insert: str,
      },
    ],
  })
}

export { format, startFormat }
