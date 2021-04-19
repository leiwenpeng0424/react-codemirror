/**
 * @desc sql formatter
 */
import { format, FormatOptions } from "sql-formatter"

/**
 *
 * @param sql
 * @param options
 * @internal
 */
export default function (sql: string, options: FormatOptions) {
  return format(sql, {
    uppercase: true,
    indent: "  ",
    ...options,
  })
}
