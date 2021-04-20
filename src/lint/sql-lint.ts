import { registerHelper } from "codemirror"
/**
 * 添加sql语句的错误提示
 *
 * 注册的helper方，通过返回一个数组来向codemirror传递lint方法补货的错误信息，
 *
 * 数组由错误对象组成。
 *
 * funds: Array<{
 *               from: CodeMirror.Pos(start, StartCol),
 *               to: CodeMirror.Pos(endLine, EndCol),
 *               message: message,
 *               severity: message.type
 *             }>
 *
 */

registerHelper("lint", "sql", function (text, options) {
  const founds = []
})
