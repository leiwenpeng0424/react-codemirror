import { EditorView } from "@codemirror/view"
import { Line } from "@codemirror/text"
import { Tree } from "lezer"

const SpecialChars = [
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  ",",
  ";",
  "-",
  "*",
]

export const LineHeight = 1
export const WordGap = 5

interface Token {
  from: number
  to: number
  number: number
  text: string
}

export class Drawer {
  view: EditorView
  ctx: CanvasRenderingContext2D
  tree: Tree
  posX: number

  constructor(view: EditorView, ctx: CanvasRenderingContext2D) {
    this.view = view
    this.ctx = ctx
  }

  /// 绘制内容
  draw(view: EditorView) {
    const tokens = []
    const doc = view.state.doc
    const totalLines = doc.lines

    let index = 1
    while (index <= totalLines) {
      const line = doc.line(index)
      this.drawLine(line)
      index++
    }
  }

  /// 处理一行的字符
  private drawLine(line: Line) {
    const { text, length, from, to, number } = line

    let offset = 2
    if (/^\s.*/.test(text)) {
      offset = /\s+/.exec(text)[0].length + 2
    }

    const tokens = text.split(/\s/)
    // reset prev token
    this.posX = null
    tokens.forEach((token, index) => {
      const tokenOffset = tokens.slice(0, index).join(" ").length
      this.drawToken(
        line,
        {
          from: line.from + tokenOffset,
          to: line.from + tokenOffset + token.length,
          number: index,
          text: token,
        },
        offset
      )
    })
  }

  /// 处理单个字符
  private drawToken(line: Line, token: Token, offset) {
    let color = "yellow",
      length: number,
      x: number,
      y: number

    x = offset // token渲染的左偏移
    y = line.number + line.number * LineHeight // token渲染的上偏移
    length = token.text.trimStart().length * 5 // token的长度

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
