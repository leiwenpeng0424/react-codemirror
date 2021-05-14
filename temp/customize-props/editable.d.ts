import { Compartment, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
export declare const editableCompart: Compartment;
export default function useEditableProp(value: boolean, view: EditorView): Extension;
