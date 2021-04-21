/**
 * 对 codemirror6 的封装
 */

import {
  basicSetup,
  EditorState,
  EditorView,
  Compartment,
} from "./setup"
import { Extension, Prec } from "@codemirror/state"
import { LanguageSupport } from "@codemirror/language"
import type { LegacyRef } from "react"
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"
import { useMount } from "./hooks"

// language
import javascript, { JavascriptProps } from "./javascript"
import json, { JsonProps } from "./json"
import sql, { SqlProps } from "./sql"

// extensions
import { viewChange } from "./extensions"

const LANGUAGE_EXTENSIONS = {
  javascript,
  sql,
  json,
}

//theme
import { oneDark } from "@codemirror/theme-one-dark"

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
   */
  extraCompletions?:
    | string[]
    | ((word: string) => string[] | Promise<string[]>)
  /**
   * 可以配置的主题
   */
  theme?: "dark" | "light"
  extensions?: (Extension | LanguageSupport)[]
}

export type ReactCodemirrorProps =
  | JavascriptProps
  | JsonProps
  | SqlProps

function ReactCodemirror(
  props: ReactCodemirrorProps,
  ref: React.Ref<EditorView>
) {
  const {
    extensions = [],
    language,
    langOptions,
    defaultValue,
    onChange,
  } = props

  const element = useRef<HTMLDivElement>()

  let editor = useRef<EditorView>()
  let languageCompartment = useRef<Compartment>()

  useImperativeHandle(ref, () => editor.current, [editor])

  useMount(() => {
    languageCompartment.current = new Compartment()

    const state: EditorState = EditorState.create({
      doc: defaultValue,
      extensions: [
        basicSetup,
        languageCompartment.current.of([
          ...extensions,
          LANGUAGE_EXTENSIONS[language](langOptions),
        ]),
        viewChange(onChange),
        oneDark,
      ],
    })

    editor.current = new EditorView({
      state: state,
      parent: element.current,
    })
  })

  useEffect(() => {
    editor.current.dispatch({
      effects: languageCompartment.current.reconfigure(
        LANGUAGE_EXTENSIONS[language](langOptions)
      ),
    })
  }, [langOptions, languageCompartment, editor])

  return (
    <div
      ref={element as LegacyRef<HTMLDivElement>}
      className="codemirror-editor-body"
    />
  )
}

export default forwardRef(ReactCodemirror)
