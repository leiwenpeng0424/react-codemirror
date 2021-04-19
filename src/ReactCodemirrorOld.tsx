/**
 * @desc 对codemirror5的封装
 */
import React, {
  useEffect,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from "react"
import codemirror from "codemirror"
import sqlKeywords from "./keywords"
import Lifecycle from "./Lifecycle"
// codemirror
import { defineOption } from "codemirror"
import type {
  Editor,
  EditorConfiguration,
  EditorFromTextArea,
} from "codemirror"
import "codemirror/addon/lint/lint.js"
import "codemirror/mode/sql/sql.js"
import "codemirror/addon/hint/show-hint.js"
import "codemirror/lib/codemirror.css"
import "codemirror/addon/hint/show-hint.css"
import "codemirror/theme/abcdef.css"
// codemirror
import formatter from "./formatter/sql"

function isPromise(obj: unknown): boolean {
  return Object.prototype.toString.call(obj) === "[object Promise]"
}

export type ReactCodemirrorProps = {
  /**
   * @description codemirror的配置，
   * @link {https://codemirror.net/doc/manual.html#config}
   */
  options?: EditorConfiguration
  /**
   * @description editor发生后出发的事件，用来获取更改后，editor的内容
   */
  onChange?: (value: string) => void
  /**
   * @description 对于智能提示，可以直接通过改字段提供，也可以通过`getExtraCompletions`字段使用一个函数来提供，
   *              函数方式是为了针对需要使用接口来获取的场景
   */
  extraCompletions?: string[]
  /**
   * @description 获取到当前的editor实例
   * @deprecated 使用ref来获取当前codemirror的实例
   */
  getInstance?: (cm: Editor) => Editor
  /**
   * @description 使用函数来获取智能补全的待选项，可以返回一个Promise，该方法接受当前输入框中的值作为判断
   */
  getExtraCompletions?: (
    word?: string
  ) => string[] | Promise<string[]>
  /**
   * 在保存之后，触发格式化操作
   */
  formatAfterSave: boolean
}

/**
 * 格式化SQL
 */
defineOption("format", false, (cm: Editor, val: boolean) => {
  const value = cm.getValue()

  if (val) {
    const formattedValue = formatter(value, {
      language: "sql",
    })

    cm.setOption("value", formattedValue)
  } else {
  }
})

/**
 * 设置placeholder的替换效果
 */
// defineOption("template", {}, (cm: Editor) => {
//   const value = cm.getValue()
//   const formattedValue = formatter(value, {
//     language: "sql",
//     params: {},
//   })
//
//   cm.setOption("value", formattedValue)
// })

/**
 *
 * @param options
 * @param onChange change event
 * @param getInstance
 * @param extraCompletions
 * @param getExtraCompletions
 * @param ref
 * @public
 */
function ReactCodemirrorOld(
  {
    options = {},
    onChange,
    getInstance,
    extraCompletions = [],
    getExtraCompletions = () => [],
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

        const keywords = sqlKeywords.keywords
          .map((item) => item.text.replace("_", " "))
          .filter((keyword) => keyword.toLowerCase().startsWith(word))

        let extraWordsFromAPI = getExtraCompletions(word) || []

        if (isPromise(extraWordsFromAPI)) {
          Promise.resolve(extraWordsFromAPI).then(
            (extraWordsFromAPI) => {
              resolve({
                list: [
                  ...keywords,
                  ...extraCompletions,
                  ...extraWordsFromAPI,
                ],
                from: codemirror.Pos(cur.line, start),
                to: codemirror.Pos(cur.line, end),
              })
            }
          )
        } else {
          resolve({
            list: [
              ...keywords,
              ...extraCompletions,
              ...(extraWordsFromAPI as string[]),
            ],
            from: codemirror.Pos(cur.line, start),
            to: codemirror.Pos(cur.line, end),
          })
        }
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
        ...options,
      }
    ))

    // const editor = codemirrorIns.current
    editor.on(
      "change",
      (cm: Editor) => onChange && onChange(cm.getValue())
    )
    editor.on("keypress", (cm: Editor, event: KeyboardEvent) => {
      // 避免空格键也进行提示
      if (
        event.which === 32 ||
        event.keyCode === 32 ||
        event.code === "Space"
      )
        return
      cm.showHint()
    })
    getInstance && getInstance(editor)
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
