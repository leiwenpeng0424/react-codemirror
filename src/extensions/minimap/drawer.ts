import { EditorView } from "@codemirror/view"
import { Line } from "@codemirror/text"
import { Tree } from "lezer"
import { getStyle } from "../../utils"
import TokenCache from "./cache"

// const SpecialChars = [
//   "(",
//   ")",
//   "{",
//   "}",
//   "[",
//   "]",
//   ",",
//   ";",
//   "-",
//   "*",
// ]

export const LineHeight = 1
export const WordGap = 5

export interface Token {
  from?: number
  to?: number
  number?: number
  color?: string
  pos?: number
  rect?: {
    x: number
    y: number
    w: number
    h: number
  }
  text: string
}

export class Drawer {
  view: EditorView
  ctx: CanvasRenderingContext2D
  posX: number
  ///
  tree: Tree = Tree.empty
  cache: TokenCache

  constructor(
    view: EditorView,
    ctx: CanvasRenderingContext2D,
    cache: TokenCache
  ) {
    this.view = view
    this.ctx = ctx
    this.cache = cache
  }

  /// 绘制内容
  draw(view: EditorView): void {
    const doc = view.state.doc
    const totalLines = doc.lines

    const textIter = doc.iter(1)

    while (!textIter.done) {
      console.log(textIter)
      textIter.next()
    }

    let index = 1
    while (index <= totalLines) {
      this.drawLine(doc.line(index))
      index++
    }
  }

  /// 处理一行的字符
  private drawLine(line: Line) {
    const { text, from } = line

    let offset = 2
    if (/^\s.*/.test(text)) {
      offset = /\s+/.exec(text)[0].length + 10
    }

    const tokens = text.split(/\s/)

    // Reset Prev Token
    this.posX = null

    tokens.forEach((token, index) => {
      const pos = from + line.text.indexOf(token) + 1
      let color

      const { node } = this.view.domAtPos(pos)

      const cacheToken = this.cache.get(token + String(line.number))
      if (
        !cacheToken ||
        cacheToken.text !== token ||
        cacheToken.pos !== pos ||
        token !== ""
      ) {
        this.cache.set(token + String(line.number), {
          text: token,
          pos,
        })
        color = getStyle(node.parentElement, "color")

        this.drawToken(
          line,
          {
            color,
            text: token,
          },
          offset
        )
        // }
      }
    })
  }

  /// 处理单个字符
  private drawToken(line: Line, token: Token, offset) {
    const color = token.color || "white"
    // let length: number, x: number, y: number

    let x = offset // token渲染的左偏移
    const y = line.number + line.number * LineHeight // token渲染的上偏移
    const length = token.text.trimStart().length * 5 // token的长度，原始长度太小，增加五倍的长度

    if (this.posX) {
      x = this.posX + WordGap
    }

    this.drawRect(x, y, color, length, LineHeight)
    this.posX = x + length
  }

  /// 绘制色块
  private drawRect(
    x: number,
    y: number,
    color: string,
    width: number,
    height: number
  ) {
    this.ctx.fillStyle = color
    this.ctx.fillRect(x, y, width, height)
  }

  /// 清理canvas内容
  clear(x: number, y: number, w: number, h: number) {
    this.ctx.clearRect(x, y, w, h)
  }
}
