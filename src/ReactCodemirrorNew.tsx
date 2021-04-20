/**
 * 对 codemirror6 的封装
 */

import {
  basicSetup,
  EditorState,
  EditorView,
} from "@codemirror/basic-setup"
import { sql } from "@codemirror/lang-sql"
import type { LegacyRef } from "react"
import React, { forwardRef, useImperativeHandle, useRef } from "react"
import { useMount } from "./hooks"

export type ReactCodemirror = {
  language?: "sql" | "javascript"
}

/**
 * react codemirror
 * @param props
 * @param ref
 * @constructor
 */
function ReactCodemirror(
  props: ReactCodemirror,
  ref: React.Ref<EditorView>
) {
  let { current: editor } = useRef<EditorView>()
  const editorRef = useRef<HTMLDivElement>()

  useImperativeHandle(ref, () => editor, [editor])

  useMount(() => {
    editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, sql()],
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
