/// language langOptions

import {
  Compartment,
  Extension,
  StateEffect,
} from "@codemirror/state"
import { EditorView } from "@codemirror/view"
import { useEffect, useRef, useState } from "react"
import { dequal } from "dequal"
import javascript, { JavascriptProps } from "../javascript"
import json from "../json"
import sql, { SqlProps } from "../sql"

const LANGUAGES = {
  javascript,
  sql,
  json,
}

const languageCompart: Compartment = new Compartment()

export type LangOptions =
  | JavascriptProps["langOptions"]
  | SqlProps["langOptions"]

function reconfigure(
  language: keyof typeof LANGUAGES,
  langOptions: LangOptions
): StateEffect<unknown> {
  return languageCompart.reconfigure(
    LANGUAGES[language](
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      langOptions
    )
  )
}

export default function useLanguageProp(
  language: keyof typeof LANGUAGES,
  langOptions: LangOptions,
  view: EditorView
): Extension {
  const prevLanguage = useRef<{
    language: string
    langOptions: unknown
  }>({
    language,
    langOptions,
  })
  const [compart] = useState<Extension>(() =>
    languageCompart.of(
      LANGUAGES[language](
        /// 有些language方法并不需要参数，所以这里会有TS的一场类型错误
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        langOptions
      )
    )
  )

  useEffect(() => {
    if (
      view &&
      (prevLanguage.current.language !== language ||
        !dequal(langOptions, prevLanguage.current.langOptions))
    ) {
      view.dispatch({
        effects: [reconfigure(language, langOptions)],
      })
    }
  }, [language, view, langOptions])

  return compart
}
