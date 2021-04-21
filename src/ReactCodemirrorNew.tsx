/**
 * 对 codemirror6 的封装
 */

import {
  basicSetup,
  EditorState,
  EditorView,
} from "@codemirror/basic-setup"
import { Extension } from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"
import { sql, SQLConfig } from "@codemirror/lang-sql"
import type { LegacyRef } from "react"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useMount } from "./hooks"

export type ReactCodemirror = {
  language?: "sql" | "javascript"
  langOptions?: { [key: string]: unknown }
  tables?: SQLConfig["tables"]
  extensions?: Extension[]
}

const LANGUAGE_EXTENSIONS = {
  javascript,
  sql,
}

/**
 * react codemirror
 * @param props
 * @param ref
 * @constructor
 */
function ReactCodemirror(
  {
    tables = [],
    language = "sql",
    langOptions = {},
    extensions = [],
  }: ReactCodemirror,
  ref: React.Ref<EditorView>
) {
  let { current: editor } = useRef<EditorView>()
  const editorRef = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => editor, [editor])

  useMount(() => {
    editor = new EditorView({
      state: EditorState.create({
        doc: "SELECT * from TABLE_A",
        extensions: [
          basicSetup,
          ...extensions,
          LANGUAGE_EXTENSIONS[language](langOptions),
        ],
      }),
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
