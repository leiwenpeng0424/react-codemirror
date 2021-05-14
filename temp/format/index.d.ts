import { EditorView } from "@codemirror/view";
/**
 * format 方法接受的参数
 */
export declare type FormatConfig = {
    parser(text: string): string | Promise<string>;
};
declare function startFormat(view: EditorView, configs: FormatConfig): void;
export { startFormat };
