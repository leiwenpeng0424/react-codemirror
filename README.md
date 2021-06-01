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
      theme="dark" // 提供黑暗和明亮两种模式 light/dark
      editable={true} // 文本是否可编辑
      extensions={[]} // 拓展方法
      extraCompletions={[]} // 已废弃
      onChange={(t: string) => t} // 在editable是true的情况下，会在每次编辑器内容变化的时候执行
      value={"sql sentance"} // 与editable关联，如果editable为false，则编辑器会接受value的值作为内容展示
      language="" // 内容格式，javascript/json/sql
      langOptions={} // 传递给语言拓展方法的初始参数
      formatter={(str) => string | Promise<string>} // 格式化方法
      diagnostics={} // 语法错误描述
      placeholder={string[]} // 编辑器的placeholder，支持多行
      snippets={[]} // 代码段补全
    />
  )
}
```

---

- 格式化代码

  `本身没有方法做格式化，提供format方法更新格式化之后的文本（通过ref将format返回，父组件可以通过ref拿到），编辑器会渲染方法返回的格式化的文本`

```typescript
import { ReactCodemirror } from "react-tools-codemirror"
import { format as sqlFormat } from "sql-formatter"

export default function () {
  const editor = useRef()

  useCallback(() => {
    editor.current.format({
      parser: (text: string) =>
        sqlFormat(text, {
          // ... sql-formatter 支持的一些参数
        }),
    })
  }, [editor])

  return (
    <>
      <button onClick={format}></button>
      <ReactCodemirror
        language="sql"
        ref={editor}
        langOptions={{
          upperCaseKeywords: true,
          // ...
        }}
        defaultValue="select * from a ,b ,c"
      />
    </>
  )
}
```

- 为 sql 提供额外的备选项

```typescript
import { ReactCodemirror } from "react-tools-codemirror"

export default function () {
  return (
    <>
      <button onClick={format}></button>
      <ReactCodemirror
        language="sql"
        langOptions={{
          // tables 会作为备选项被lang-sql接收，并在补全待选中展示出来。
          tables: [
            { label: "asd", type: "property" },
            {
              label: "bsd",
              type: "property",
            },
          ],
        }}
        defaultValue="select * from a ,b ,c"
      />
    </>
  )
}
```

## Features

- [x] 通过 ref 直接访问 codemirror 的 editor 实例，方便直接调用实例的方法。
- [x] 将 value 从 codemirror 的配置中提取出来作为第一级参数。
- [x] 使用 sql-formatter 库来支持 sql 的 format 功能。
- [ ] 支持 sql 的 lint 功能，目前还没有找到有浏览器可用的第三方库。
