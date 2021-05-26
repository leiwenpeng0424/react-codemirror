/**
 * 对 codemirror6 的封装
 */
import { basicSetup, EditorState, EditorView } from "./setup"
import { Extension } from "@codemirror/state"
import { LanguageSupport } from "@codemirror/language"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useMount, useUnmount } from "./hooks/lifecycle"

// language
import { JavascriptProps } from "./javascript"
import { JsonProps } from "./json"
import { SqlProps } from "./sql"

// extensions
import minimap from "./extensions/minimap"
import { startFormat, FormatConfig } from "./format"

// feature flags
import {
  MINIMAP_FLAG,
  VIEW_CHANGE,
  PLACEHOLDER_FLAG,
  KEYMAP_PROMPT,
  FORMAT,
} from "./features"

// hooks for customize-props
import useEditableProp from "./customize-props/editable"
import useLanguageProp from "./customize-props/language"
import useThemeProp from "./customize-props/theme"
import useDiagnostics, {
  ExtraDiagnostic,
} from "./customize-props/diagnostics"
import useExtensionsCompart from "./customize-props/extensions"
import useChangedValue, {
  listenValueChangeAndInvokeCallback,
} from "./customize-props/value"
import usePlaceholderProp from "./customize-props/placeholer"
import keymapPrompt from "./extensions/keymapPrompt/prompt"
import format from "./extensions/format"

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
    | ((completion: string) => string[] | Promise<string[]>)
  /// 可以配置的主题
  theme?: "dark" | "light"
  /// 是否可编辑
  editable?: boolean
  /// 拓展方法，或者语言
  extensions?: (Extension | LanguageSupport)[]
  /// 额外的错误提示。可以从接口获取，在editor中渲染
  diagnostics?: ExtraDiagnostic
  /// placeholder
  placeholder?: string[]
  [key: string]: unknown
}

export type ReactCodemirrorProps =
  | JavascriptProps
  | JsonProps
  | SqlProps

export type ReactCodemirrorRefValues = {
  readonly editor?: EditorView
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
  ref: React.MutableRefObject<ReactCodemirrorRefValues>
) {
  const { onChange } = props
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

  const themeCompart = useThemeProp(
    props.theme || "dark",
    editor.current
  )

  const editCompart = useEditableProp(
    props.editable != undefined ? props.editable : true,
    editor.current
  )

  const languageCompart = useLanguageProp(
    props.language,
    props.langOptions,
    editor.current
  )

  const extensionsCompart = useExtensionsCompart(
    props.extensions || [],
    editor.current
  )

  const placeholderCompart = usePlaceholderProp(
    props.placeholder,
    editor.current
  )

  useDiagnostics(props.diagnostics, editor.current)
  useChangedValue(props.value, editor.current)

  useMount(() => {
    const state: EditorState = EditorState.create({
      doc: props.defaultValue || props.value || "", // 同时接受defaultValue和value做为初始值
      extensions: [
        basicSetup,
        editCompart,
        themeCompart,
        languageCompart,
        extensionsCompart,
        MINIMAP_FLAG && minimap,
        PLACEHOLDER_FLAG && placeholderCompart,
        VIEW_CHANGE && listenValueChangeAndInvokeCallback(onChange),
        KEYMAP_PROMPT && keymapPrompt({ placement: "leftbottom" }),
        /// 使用快捷键进行格式化，只针对sql语言
        FORMAT && format((props as SqlProps).formatter),
      ].filter(Boolean) as Extension,
    })

    editor.current = new EditorView({
      state: state,
      parent: element.current,
    })
  })
  useUnmount(() => editor.current.destroy())

  return (
    <div
      ref={element}
      className="codemirror-editor-body"
      style={props.style}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore 接受css属性，兼容 @emotion/react 的属性
      css={props.css}
    />
  )
}

export default forwardRef(ReactCodemirror)
