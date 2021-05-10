/**
 * 对 codemirror6 的封装
 */

import { basicSetup, EditorState, EditorView } from "./setup"
import { Extension } from "@codemirror/state"
import { LanguageSupport } from "@codemirror/language"
import type { LegacyRef } from "react"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useMount, useUnmount } from "./hooks/lifecycle"

// language
import { JavascriptProps } from "./javascript"
import { JsonProps } from "./json"
import { SqlProps } from "./sql"

// extensions
import { viewChange, minimap } from "./extensions"
import { startFormat, FormatConfig } from "./format"

// feature flags
import { MINIMAP_FLAG, VIEW_CHANGE } from "../feature.js"

// hooks for customize-props
import useEditableProp from "./customize-props/editable"
import useLanguageProp from "./customize-props/language"
import useThemeProp from "./customize-props/theme"
import useDiagnostics, {
  ExtraDiagnostic,
} from "./customize-props/diagnostics"
import useExtensionsCompart from "./customize-props/extensions"
import useChangedValue from "./customize-props/value"

export type IEditor = EditorView

export interface CommonProps {
  /// 通过value可以修改editor内部的值
  value?: string
  /// 编辑器初始化使用的值
  defaultValue?: string
  /// editor内容修改触发该方法
  onChange?: (value: unknown) => void
  /// 针对当前输入添加额外的补全候选
  /**
   * @deprecated
   */
  extraCompletions?:
    | string[]
    | ((word: string) => string[] | Promise<string[]>)
  /// 可以配置的主题
  theme?: "dark" | "light"
  /// 是否可编辑
  editable?: boolean
  /// 拓展方法，或者语言
  extensions?: (Extension | LanguageSupport)[]
  /// 额外的错误提示。可以从接口获取，在editor中渲染
  diagnostics?: ExtraDiagnostic
  /// 额外的props，例如传入样式等
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
  ref: LegacyRef<ReactCodemirrorRefValues>
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
    diagnostics,
    ...others
  } = props
  const element = useRef<HTMLDivElement>()
  const editor = useRef<EditorView>()

  useImperativeHandle(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref,
    () => ({
      format(configs: FormatConfig) {
        startFormat(editor.current, configs)
      },
    }),
    [editor]
  )

  const themeCompart = useThemeProp(theme, editor.current)
  const editCompart = useEditableProp(editable, editor.current)
  const languageCompart = useLanguageProp(
    language,
    langOptions,
    editor.current
  )
  const extensionsCompart = useExtensionsCompart(
    extensions,
    editor.current
  )

  useDiagnostics(diagnostics, editor.current)
  useChangedValue(value, editor.current)

  useMount(() => {
    const state: EditorState = EditorState.create({
      doc: defaultValue,
      extensions: [
        basicSetup,
        editCompart,
        themeCompart,
        languageCompart,
        extensionsCompart,
        VIEW_CHANGE && viewChange(onChange, editable),
        MINIMAP_FLAG && minimap,
      ].filter(Boolean),
    })

    editor.current = new EditorView({
      state: state,
      parent: element.current,
    })
  })
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
