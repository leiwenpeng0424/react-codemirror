import { EditorView } from "@codemirror/view";
import { Tree } from "lezer";
import TokenCache from "./cache";
export declare const LineHeight = 1;
export declare const WordGap = 5;
export interface Token {
    from?: number;
    to?: number;
    number?: number;
    color?: string;
    pos?: number;
    rect?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    text: string;
}
export declare class Drawer {
    view: EditorView;
    ctx: CanvasRenderingContext2D;
    posX: number;
    tree: Tree;
    cache: TokenCache;
    constructor(view: EditorView, ctx: CanvasRenderingContext2D, cache: TokenCache);
    draw(view: EditorView): void;
    private drawLine;
    private drawToken;
    private drawRect;
    clear(x: number, y: number, w: number, h: number): void;
}
