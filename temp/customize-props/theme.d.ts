import { Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
declare const THEMES: {
    dark: Extension[];
    light: Extension[];
};
export default function useThemeProp(theme: keyof typeof THEMES, view: EditorView): Extension;
export {};
