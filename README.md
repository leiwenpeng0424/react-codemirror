# react-tools-codemirror

codemirror 的 react 组件封装

## Usage

- 使用组件 ReactCodemirror

```typescript jsx
import { ReactCodemirror } from "react-tools-codemirror"
import { useState } from "react"

// codemirror 支持的配置
// @link {https://codemirror.net/doc/manual.html#config}
const EditorOptions = {}

export default function () {
  const [code, setCode] = useState("select * from TABLE_A")
  return (
    <ReactCodemirror
      theme="dark" // dark，light，默认dark
      value={code} // @deperacated
      defaultValue={code} // 初始文本
      options={EditorOptions}
      onChange={(text: string) => {
        // 输入后的文本
      }}
      extraSource={
        // 对于自动补全的增强，可以丰富本身提供的有限的待选项
        ["TABLE_A", "TABLE_B"]
        // (word: string) => ["AAA", "BBB"] // 支持函数返回数组。或者是返回目标参数是数组的Promise对象
        // (word: string) => Promise.resolve(["AAA", "BBBB"])
      }
    />
  )
}
```

---

- 格式化代码

  `现在只支持sql的格式化`

```typescript jsx
import { ReactCodemirror } from "react-tools-codemirror"
import { useCallback, useEffect, useRef } from "react"

import type { IEditor, IFormatOptions } from "react-tools-codemirror"

// codemirror 支持的配置
// @link {https://codemirror.net/doc/manual.html#config}
const FormatOptions: IFormatOptions = {}

export default function () {
  const editor = useRef<IEditor>()

  const format = useCallback(() => {
    // 直接调用codemirror实例执行format方法，
    // 除了在这里设置格式化参数之外，也可以在逐渐的options下配置formatOptions来设置格式化参数
    editor.current.format({
      language: "sql",
      params: {},
      uppercase: true,
      linesBetweenQueries: 0,
    })
  }, [editor.current])

  return (
    <>
      <button onClick={format}></button>
      <ReactCodemirror ref={editor} />
    </>
  )
}
```

## Features

- [x] 通过 ref 直接访问 codemirror 的 editor 实例，方便直接调用实例的方法。
- [x] 将 value 从 codemirror 的配置中提取出来作为第一级参数。
- [x] 使用 sql-formatter 库来支持 sql 的 format 功能。
- [ ] 支持 sql 的 lint 功能，目前还没有找到有浏览器可用的第三方库。
