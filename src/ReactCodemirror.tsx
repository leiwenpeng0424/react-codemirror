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
import type { LegacyRef } from "react"
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import { useMount, useUnmount } from "./hooks/lifecycle"

// language
import javascript, { JavascriptProps } from "./javascript"
import json, { JsonProps } from "./json"
import sql, { SqlProps } from "./sql"

// extensions
import { viewChange } from "./extensions"
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
}

export type ReactCodemirrorProps =
  | JavascriptProps
  | JsonProps
  | SqlProps

interface StaticCodemirrorProps extends CommonProps {
  editable: false
  onChange: never
  defaultValue: never
  language: ReactCodemirrorProps["language"]
  langOptions: ReactCodemirrorProps["langOptions"]
}

function ReactCodemirror(
  props: ReactCodemirrorProps | StaticCodemirrorProps,
  ref: React.Ref<{ format(configs: FormatConfig): void }>
) {
  const {
    extensions = [],
    language,
    langOptions,
    defaultValue,
    onChange,
    value,
    theme = "dark",
    editable = true,
  } = props

  const element = useRef<HTMLDivElement>()

  let editor = useRef<EditorView>()
  let languageCompartment = useRef<Compartment>(new Compartment())
  let editableCompartment = useRef<Compartment>(new Compartment())
  let extensionsCompartment = useRef<Compartment>(new Compartment())
  let themeCompartment = useRef<Compartment>(new Compartment())

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
        LANGUAGE_EXTENSIONS[language](langOptions),
        viewChange(onChange, editable),
      ].filter(Boolean)
    )

    const editoableEx = editableCompartment.current.of(
      EditorView.editable.of(editable)
    )

    const extensionsEx = extensionsCompartment.current.of(
      extensions.filter(Boolean)
    )

    const themeEx = themeCompartment.current.of(THEMES[theme])

    const state: EditorState = EditorState.create({
      doc: defaultValue,
      extensions: [
        basicSetup,
        languageEx,
        editoableEx,
        extensionsEx,
        themeEx,
      ],
    })

    editor.current = new EditorView({
      state: state,
      parent: element.current,
    })
  })

  // 1. language
  useEffect(() => {
    editor.current.dispatch({
      effects: [
        languageCompartment.current.reconfigure([
          LANGUAGE_EXTENSIONS[language](langOptions),
        ]),
        editableCompartment.current.reconfigure(
          EditorView.editable.of(editable)
        ),
      ],
    })
  }, [langOptions, languageCompartment, theme, editor, editable])

  // 2. extensions
  useEffect(() => {
    editor.current.dispatch({
      effects: extensionsCompartment.current.reconfigure(
        [...extensions].filter(Boolean)
      ),
    })
  }, [extensionsCompartment, extensions, editor])

  // 3. theme
  useEffect(() => {
    editor.current.dispatch({
      effects: themeCompartment.current.reconfigure([
        [THEMES[theme]].filter(Boolean),
      ]),
    })
  }, [themeCompartment, theme, editor])

  // 3. editable
  useEffect(() => {
    editor.current.dispatch({
      effects: editableCompartment.current.reconfigure([
        EditorView.editable.of(editable),
        viewChange(onChange, editable),
      ]),
    })
  }, [editableCompartment, editable, onChange, editor])

  useEffect(() => {
    // 如果是静态的编辑器，那就把外部传入的value直接dispatch到EditorState中
    if (editable && value) {
      return
    }
    if (!editable && value) {
      const view = editor.current
      editor.current.dispatch({
        changes: [
          {
            from: 0,
            to: view.state.doc.length,
            insert: value,
          },
        ],
      })
    }
  }, [editable, value, editor])

  useUnmount(() => editor.current.destroy())

  return (
    <div
      ref={element as LegacyRef<HTMLDivElement>}
      className="codemirror-editor-body"
    />
  )
}

export default forwardRef(ReactCodemirror)
