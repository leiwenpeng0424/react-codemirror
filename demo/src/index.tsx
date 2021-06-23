import { logException } from "@codemirror/view"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { ReactCodemirror } from "../../dist"

// `class`, `constant`, `enum`,
// `function`, `interface`, `keyword`, `method`,
// `namespace`, `property`, `text`, `type`, `variable`

const App: React.FC<Record<string | number, never>> = () => {
  return (
    <ReactCodemirror
      language="python"
      style={{ height: 500 }}
      value={`#可自行修改的数值会在行末备注
      #numinput接受外界数值
      #position获取笔的坐标（x与y，保存在元祖)
      #heading获取笔的朝向
      #set设置笔的XX（朝向/x坐标/y坐标)
      import turtle
      t = turtle.Pen()
      t.penup()
      t.speed(0)
      turtle.bgcolor("black")#画板颜色（可改）
      sides = int(turtle.numinput("Number of sides","How many sides in your spiral of spirals? (2~6)",4,2,6))#numinput接受外界数值
      colors = ['red','yellow','blue','green','purple','orange']#存颜色（可改）
      for m in range(100):
          t.fd(m*4)
          position = t.position()#position获取笔的坐标（x与y，保存在元祖)
          heading = t.heading()#heading获取笔的朝向
          print(position, heading)
          for n in range(int(m/2)):
              t.pendown()
              t.pencolor(colors[n%sides])
              t.fd(2*n)
              t.right(360/sides-2)
              t.penup()
          t.setx(position[0])#setx设置笔的x坐标
          t.sety(position[1])#sety设置笔的y坐标
          t.setheading(heading)#setheading设置笔的朝向
          t.left(360/sides+2)
      #截图我懒得放= =
      `}
      // langOptions={{
      //   upperCaseKeywords: true,
      //   schema: {
      //     "ai-process-zzytest": [],
      //   },
      //   tables: [
      //     {
      //       label: "ai-process-zzytest",
      //       info: () => {
      //         const dom = document.createElement("div")
      //         const body = document.createElement("div")
      //         body.innerHTML = `
      //           <div><span>sourceName: </span><span>AI-kafka-test</span></div>
      //           <div><span>sourceType: </span><span>KAFKA</span></div>
      //           <div><span>id: </span><span>1397850326601564162</span></div>
      //         `
      //         dom.appendChild(body)
      //         return dom
      //       },
      //     },
      //   ],
      // }}
      // snippets={[
      //   {
      //     label: "TUMBLE",
      //     info: "TUMBLE",
      //     template:
      //       "TUMBLE(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
      //   },
      //   {
      //     label: "TUMBLE_START",
      //     info: "TUMBLE_START",
      //     template:
      //       "TUMBLE_START(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
      //   },
      //   {
      //     label: "TUMBLE_END",
      //     info: "TUMBLE_END",
      //     template:
      //       "TUMBLE_END(${1:proctime}, ${2:interval} '${3:count}' ${4:unit})",
      //   },
      //   {
      //     label: "kafka",
      //     info: "kafka",
      //     template:
      //       "'kafka',\nbootstrapServers = '',\noffsetReset = '',\ngroupID = '',\nzookeeperQuorum = '',\ntopic = '',\nparallelism = ",
      //     hit: "type-=",
      //   },
      //   {
      //     label: "gp",
      //     info: "gp",
      //     template: "gp",
      //     hit: "type-=",
      //   },
      //   {
      //     label: "gql",
      //     info: "gql",
      //     template: "gqll",
      //     hit: "type-=",
      //   },
      // ]}
    />
  )
}

ReactDOM.render(<App />, document.getElementById("app"))
