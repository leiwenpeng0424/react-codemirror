/**
 * 对 codemirror6 的封装
 */

import {
  basicSetup,
  EditorState,
  EditorView,
  Compartment,
} from "./setup"
import { Extension } from "@codemirror/state"
import { LanguageSupport } from "@codemirror/language"
import type { LegacyRef, MutableRefObject } from "react"
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import { useMount, useUnmount } from "./hooks/lifecycle"
import { dequal } from "dequal"

// language
import javascript, { JavascriptProps } from "./javascript"
import json, { JsonProps } from "./json"
import sql, { SqlProps } from "./sql"

// extensions
import { viewChange, minimalLines } from "./extensions"
import { startFormat, FormatConfig } from "./format"

const LANGUAGE_EXTENSIONS = {
  javascript,
  sql,
  json,
}

//theme
import { oneDark as dark } from "./theme/dark"
import { oneDark as light } from "./theme/light"

const THEMES = {
  dark,
  light,
}

export type IEditor = EditorView

export interface CommonProps {
  /**
   * 编辑器的值
   */
  value?: string
  /**
   * 编辑器初始化使用的值
   */
  defaultValue?: string
  /**
   * 编辑器内容发生变化触发的回调函数
   */
  onChange?: (value: unknown) => void
  /**
   * 针对当前输入添加额外的补全候选
   * @deprecated
   */
  extraCompletions?:
    | string[]
    | ((word: string) => string[] | Promise<string[]>)
  /**
   * 可以配置的主题
   */
  theme?: "dark" | "light"
  /**
   * 是否可编辑
   */
  editable?: boolean
  /**
   * 拓展方法
   */
  extensions?: (Extension | LanguageSupport)[]
  /**
   * 默认展示的行数
   */
  defaultLines?: number
  /**
   * 额外的props
   */
  [key: string]: unknown
}

export type ReactCodemirrorProps =
  | JavascriptProps
  | JsonProps
  | SqlProps

export type ReactCodemirrorRefValues = {
  format(configs: FormatConfig): void
}

interface StaticCodemirrorProps extends CommonProps {
  editable: false
  onChange: never
  defaultValue: never
  language: ReactCodemirrorProps["language"]
  langOptions: ReactCodemirrorProps["langOptions"]
}

function ReactCodemirror(
  props: ReactCodemirrorProps | StaticCodemirrorProps,
  ref: MutableRefObject<ReactCodemirrorRefValues>
) {
  const {
    extensions = [],
    language,
    langOptions,
    defaultValue,
    onChange,
    value,
    theme = "dark",
    defaultLines,
    editable = true,
    ...others
  } = props

  const preLangOptions = useRef(langOptions)

  const element = useRef<HTMLDivElement>()

  let editor = useRef<EditorView>()
  let languageCompartment = useRef<Compartment>(new Compartment())
  let editableCompartment = useRef<Compartment>(new Compartment())
  let extensionsCompartment = useRef<Compartment>(new Compartment())
  let themeCompartment = useRef<Compartment>(new Compartment())
  // let schemaCompartment = useRef<Compartment>(new Compartment())

  useImperativeHandle(
    ref,
    () => ({
      format(configs: FormatConfig) {
        startFormat(editor.current, configs)
      },
    }),
    [editor]
  )

  useMount(() => {
    const languageEx = languageCompartment.current.of(
      [
        // @ts-ignore
        LANGUAGE_EXTENSIONS[language](langOptions),
        // viewChange(onChange, editable),
      ].filter(Boolean)
    )

    const editoableEx = editableCompartment.current.of(
      EditorView.editable.of(editable)
    )

    const extensionsEx = extensionsCompartment.current.of(
      extensions.filter(Boolean)
    )

    const themeEx = themeCompartment.current.of(THEMES[theme])

    // const sqlSchemaEx = schemaCompartment.current.of(
    //   schemaCompletion(langOptions as SQLConfig)
    // )

    const state: EditorState = EditorState.create({
      doc: defaultValue,
      extensions: [
        basicSetup,
        languageEx,
        editoableEx,
        extensionsEx,
        themeEx,
        // sqlSchemaEx,
        viewChange(onChange, editable),
        // minimalLines(defaultLines),
      ],
    })

    editor.current = new EditorView({
      state: state,
      parent: element.current,
    })
  })

  // 1. language
  useEffect(() => {
    if (
      language === "sql" &&
      !dequal(langOptions, preLangOptions.current)
    ) {
      editor.current.dispatch({
        effects: languageCompartment.current.reconfigure(
          // @ts-ignore
          LANGUAGE_EXTENSIONS[language](langOptions)
        ),
      })

      preLangOptions.current = langOptions
    }
  }, [langOptions, language])

  // 2. extensions
  useEffect(() => {
    editor.current.dispatch({
      effects: extensionsCompartment.current.reconfigure(
        [...extensions].filter(Boolean)
      ),
    })
  }, [extensions])

  // 3. theme, editable
  useEffect(() => {
    editor.current.dispatch({
      effects: themeCompartment.current.reconfigure([
        [THEMES[theme]].filter(Boolean),
        EditorView.editable.of(editable),
      ]),
    })
  }, [theme, editable])

  useEffect(() => {
    // 如果是静态的编辑器，那就把外部传入的value直接dispatch到EditorState中
    // if (editable && value) {
    //   return
    // }
    // if (!editable && value) {
    // const view = editor.current
    editor.current.dispatch({
      changes: [
        {
          from: 0,
          to: editor.current.state.doc.length,
          insert: value,
        },
      ],
    })
    // }
  }, [value])

  useUnmount(() => editor.current.destroy())

  return (
    <div
      ref={element as LegacyRef<HTMLDivElement>}
      className="codemirror-editor-body"
      {...others}
    />
  )
}

export default forwardRef(ReactCodemirror)
