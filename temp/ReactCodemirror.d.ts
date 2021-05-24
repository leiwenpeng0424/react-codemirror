/**
 * 对 codemirror6 的封装
 */
import { EditorView } from "./setup";
import { Extension } from "@codemirror/state";
import { LanguageSupport } from "@codemirror/language";
import React from "react";
import { JavascriptProps } from "./javascript";
import { JsonProps } from "./json";
import { SqlProps } from "./sql";
import { FormatConfig } from "./format";
import { ExtraDiagnostic } from "./customize-props/diagnostics";
export declare type IEditor = EditorView;
export interface CommonProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value: unknown) => void;
    /**
     * @deprecated
     */
    extraCompletions?: string[] | ((completion: string) => string[] | Promise<string[]>);
    theme?: "dark" | "light";
    editable?: boolean;
    extensions?: (Extension | LanguageSupport)[];
    diagnostics?: ExtraDiagnostic;
    placeholder?: string[];
    [key: string]: unknown;
}
export declare type ReactCodemirrorProps = JavascriptProps | JsonProps | SqlProps;
export declare type ReactCodemirrorRefValues = {
    readonly editor?: EditorView;
    format(configs: FormatConfig): void;
};
interface StaticCodemirrorProps extends CommonProps {
    editable: false;
    onChange: never;
    defaultValue: never;
    language: ReactCodemirrorProps["language"];
    langOptions: ReactCodemirrorProps["langOptions"];
}
declare const _default: React.ForwardRefExoticComponent<Pick<ReactCodemirrorProps | StaticCodemirrorProps, string | number> & React.RefAttributes<ReactCodemirrorRefValues>>;
export default _default;
