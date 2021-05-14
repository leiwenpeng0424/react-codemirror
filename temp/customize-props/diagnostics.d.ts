import { EditorView } from "@codemirror/view";
export interface ExtraDiagnostic {
    checkNo?: string;
    checkResult: DiagnosticResult;
    funcOSSList?: unknown[];
    parsedTableResult?: {
        funcs?: string | null;
        inCSVs?: string | null;
        inHbases?: unknown[];
        inRDBs?: unknown[];
        kafkaItem?: unknown[];
        sinkKafkas?: unknown[];
    };
    withFunc?: boolean;
}
declare type LineOffset = {
    EndLine: number;
    EndOffset: number;
    StartLine: number;
    StartOffset: number;
};
declare type DiagnosticItem = {
    error: string;
    errorCode: number;
    lineOffsets: LineOffset[];
};
declare type DiagnosticResult = {
    checkItems: DiagnosticItem[];
    rawSQL: string;
};
export default function useDiagnostics(diagnostics: ExtraDiagnostic, view: EditorView): void;
export {};
