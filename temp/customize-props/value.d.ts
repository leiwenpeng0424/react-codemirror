import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
export default function useChangedValue(value: string, view: EditorView): void;
export declare function listenValueChangeAndInvokeCallback(handler: (text: string) => void): Extension;
