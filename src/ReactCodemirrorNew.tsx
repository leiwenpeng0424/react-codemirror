/**
 * 对 codemirror6 的封装
 */

import {
  basicSetup,
  EditorState,
  EditorView,
} from "@codemirror/basic-setup"
import { LanguageSupport } from "@codemirror/language"
import type { LegacyRef } from "react"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useMount } from "./hooks"
import { Extension } from "@codemirror/state"
// language
import javascript, { JavascriptProps } from "./javascript"
import json, { JsonProps } from "./json"
import sql, { SqlProps } from "./sql"

const LANGUAGE_EXTENSIONS = {
  javascript,
  sql,
  json,
}

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
  onChange?: (value: string) => void
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

  let { current: editor } = useRef<EditorView>()
  const editorRef = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => editor, [editor])

  useMount(() => {
    const state = EditorState.create({
      doc: defaultValue,
      extensions: [
        basicSetup,
        ...extensions,
        // @ts-ignore language是sql的时候，langOption的类型是never。
        LANGUAGE_EXTENSIONS[language](langOptions),
      ],
    })

    editor = new EditorView({
      state: state,
      parent: editorRef.current,
    })
  })

  return (
    <div
      ref={editorRef as LegacyRef<HTMLDivElement>}
      className="codemirror-editor-body"
    />
  )
}

export default forwardRef(ReactCodemirror)
