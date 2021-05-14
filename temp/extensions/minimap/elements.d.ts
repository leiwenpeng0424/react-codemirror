import { EditorView } from "@codemirror/view";
export declare class Viewbox {
    node: HTMLElement;
    constructor(parent: HTMLElement);
    appendStyle(cssStyle: CSSStyleDeclaration): void;
    scroll(scrollTop: number): void;
    hide(): void;
    show(): void;
    resize(width: number, height: number): void;
    attach(parent: HTMLElement): void;
}
export declare class CanvasElement {
    node: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    constructor(parent: HTMLElement);
    attachCanvasLayer(parent: HTMLElement): void;
    initLayer(): void;
    resize(width: number, height: number): void;
}
export declare class MinimapElement {
    view: EditorView;
    node: HTMLElement;
    width: number;
    height: number;
    attached: boolean;
    constructor(view: EditorView);
    resize(width: number, height: number): void;
    setSide(side: "left" | "right"): void;
    setBackground(bg: string): void;
}
