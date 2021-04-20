/**
 * 对 codemirror6 的封装
 */

import {
  EditorState,
  EditorView,
  basicSetup,
} from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import React, { useRef } from "react"
import { useMount } from "./hooks"

import type { LegacyRef } from "react"

export default function ReactCodemirror() {
  const ref = useRef<HTMLDivElement>()

  useMount(() => {
    let editor = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, javascript()],
      }),
      parent: ref.current,
    })
  })

  return (
    <div
      ref={ref as LegacyRef<HTMLDivElement>}
      className="codemirror-editor-body"
    />
  )
}
