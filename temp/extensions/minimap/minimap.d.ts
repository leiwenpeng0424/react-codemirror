import { EditorView } from "@codemirror/view";
import { CanvasElement, MinimapElement, Viewbox } from "./elements";
import { Drawer } from "./drawer";
import TokenCache from "./cache";
export default class Minimap {
    view: EditorView;
    minimap: MinimapElement;
    canvas: CanvasElement;
    viewbox: Viewbox;
    drawer: Drawer;
    cache: TokenCache;
    constructor(view: EditorView);
    resize(width: number, height: number): void;
    setBackground(bg: string): void;
    detach(): Minimap;
    attach(): Minimap;
    render(view?: EditorView): void;
}
