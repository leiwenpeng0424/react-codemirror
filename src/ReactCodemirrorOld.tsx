/**
 * @desc 对codemirror5的封装
 */
import type {
  Editor,
  EditorConfiguration,
  EditorFromTextArea,
} from "codemirror"
import codemirror from "codemirror"
import type { IEditor, IFormatOptions } from "./format/format"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/addon/lint/lint.js"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/sql/sql.js"
import "codemirror/theme/abcdef.css"
import React, {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react"
import Lifecycle from "./hooks/Lifecycle"
import sqlKeywords from "./keywords"
// import "./lint/sql-lint"
import "./format/format"
import { useTimeout } from "./hooks"

function isPromise(obj: unknown): boolean {
  return Object.prototype.toString.call(obj) === "[object Promise]"
}

export type ReactCodemirrorProps = {
  /**
   * @description 编辑器展示的内容文本，改编辑器不太适合作为受控组件出现，最好不要用这个东西来文本的内容，可以通过ref返回的实例的getValue()方法来获取文本的实例。
   * @deprecated
   */
  value?: string
  /**
   * @description 默认展示的文本内容
   */
  defaultValue?: string
  /**
   * @description codemirror的配置，
   * @link {https://codemirror.net/doc/manual.html#config}
   */
  options?: EditorConfiguration & {
    formatOptions?: IFormatOptions
  }
  /**
   * @description editor发生后出发的事件，用来获取更改后，editor的内容
   *
   * @bug 避免在onChange事件中调用修改value的方法，可能会有调用栈移除的风险
   */
  onChange?: (value: string) => void
  /**
   * @description 拓展自动补全功能，提供外部方法来补从不全的待选项
   */
  extraCompletions?:
    | string[]
    | ((word: string) => string[] | Promise<string[]>)
}

/**
 * 外部使用的codemirror react封装
 * @param options
 * @param value
 * @param onChange change event
 * @param getInstance
 * @param extraCompletions
 * @param ref
 * @public
 */
function ReactCodemirrorOld(
  {
    options = {},
    value = "",
    onChange,
    defaultValue = "",
    extraCompletions = [],
  }: ReactCodemirrorProps,
  ref: ForwardedRef<Editor>
): React.ReactElement {
  const codemirrorRef = React.useRef<HTMLTextAreaElement>()
  const codemirrorIns = React.useRef<EditorFromTextArea>()

  useEffect(() => {
    const ins = codemirrorIns.current
    Object.keys(options).forEach(
      (optKey: keyof EditorConfiguration) => {
        if (options[optKey] !== ins.getOption(optKey)) {
          ins.setOption(optKey, options[optKey])
        }
      }
    )
  }, [options])

  /**
   * @description 单独修改value的变化
   *  只针对第一次加载组件渲染一次
   */
  useEffect(() => codemirrorIns.current.setValue(defaultValue), [
    codemirrorRef.current,
  ])

  /**
   * filter matched keywords
   */
  function completion(cm: Editor) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cur = cm.getCursor()
        const line = cm.getLine(cur.line)
        let start = cur.ch,
          end = cur.ch
        while (start && /\w/.test(line.charAt(start - 1))) --start
        while (end < line.length && /\w/.test(line.charAt(end))) ++end
        const word = line.slice(start, end + 1)

        const keywords = word
          ? sqlKeywords.keywords
              .map((item) => item.text.replace("_", " "))
              .filter((keyword) =>
                keyword.toLowerCase().startsWith(word)
              )
          : []

        let extraWords

        if (typeof extraCompletions === "function") {
          extraWords = extraCompletions(word)

          if (isPromise(extraWords)) {
            Promise.resolve(extraWords).then((words) => {
              resolve({
                list: [...keywords, ...words],
                from: codemirror.Pos(cur.line, start),
                to: codemirror.Pos(cur.line, end),
              })
            })

            return
          }
        }

        extraWords = extraCompletions

        resolve({
          list: [...keywords, ...extraWords],
          from: codemirror.Pos(cur.line, start),
          to: codemirror.Pos(cur.line, end),
        })
      }, 100)
    })
  }

  function didMount() {
    const editor = (codemirrorIns.current = codemirror.fromTextArea(
      codemirrorRef.current,
      {
        theme: "abcdef",
        mode: "sql",
        autocorrect: false,
        lineNumbers: true,
        hintOptions: {
          hint: completion,
        },
        lint: {},
        ...options,
      }
    ))

    // const editor = codemirrorIns.current
    editor.on(
      "change",
      (cm: Editor) => onChange && onChange(cm.getValue())
    )

    editor.on("keypress", (cm: Editor, event: KeyboardEvent) => {
      cm.showHint()
    })

    if (
      options.formatOptions &&
      Object.keys(options.formatOptions).length !== 0
    ) {
      // @ts-ignore
      setTimeout(() => editor.format(), 100)
    }
  }

  function willUnmount() {}

  useImperativeHandle(ref, () => codemirrorIns.current, [
    codemirrorIns.current,
  ])

  return (
    <Lifecycle didMount={didMount} willUnmount={willUnmount}>
      <textarea
        ref={codemirrorRef as React.LegacyRef<HTMLTextAreaElement>}
      />
    </Lifecycle>
  )
}

export default forwardRef(ReactCodemirrorOld)