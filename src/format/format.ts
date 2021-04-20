import { defineExtension, defineOption, Editor } from "codemirror"
import { format, FormatOptions } from "sql-formatter"

export type IEditor = Editor & {
  format(options: Partial<FormatOptions>): void
}

export type IFormatOptions = FormatOptions

// 定义格式化的参数, 参考sql-format的参数
defineOption(
  "formatOptions",
  {
    language: "sql",
    params: {},
    uppercase: true,
    indent: " ",
  } as FormatOptions,
  (cm: IEditor, opts) => {
    cm.format(opts)
  }
)

defineExtension("format", function (opts) {
  const defaultOptions = this.options.formatOptions || {
    language: "sql",
  }

  const val = this.getValue()

  val &&
    this.setOption(
      "value",
      format(val, Object.assign({}, defaultOptions, opts))
    )
})
