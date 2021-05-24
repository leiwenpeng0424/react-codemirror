import { Diagnostic } from "@codemirror/lint";
import { EditorView } from "@codemirror/view";
import { ExtraDiagnostic } from "./customize-props/diagnostics";
export declare const translateDiagnostics: (input: ExtraDiagnostic, view: EditorView) => Diagnostic[];
export declare const isSameTextAccordingToDoc: (editor: EditorView, value?: string) => boolean;
export declare function getStyle(element: Element, attr: string): string;
