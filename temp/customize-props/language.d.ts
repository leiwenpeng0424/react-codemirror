import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import javascript, { JavascriptProps } from "../javascript";
import json from "../json";
import sql, { SqlProps } from "../sql";
declare const LANGUAGES: {
    javascript: typeof javascript;
    sql: typeof sql;
    json: typeof json;
};
export declare type LangOptions = JavascriptProps["langOptions"] | SqlProps["langOptions"];
export default function useLanguageProp(language: keyof typeof LANGUAGES, langOptions: LangOptions, view: EditorView): Extension;
export {};
