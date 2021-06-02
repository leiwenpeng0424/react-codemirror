import repeat from "lodash/repeat"
import last from "lodash/last"

const INDENT_TYPE_TOP_LEVEL = "top-level"
const INDENT_TYPE_BLOCK_LEVEL = "block-level"

/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
 */
export default class Indentation {
  indent: string
  indentTypes: string[]

  /**
   * @param {String} indent Indent value, default is "  " (2 spaces)
   */
  constructor(indent: string) {
    this.indent = indent || "  "
    this.indentTypes = []
  }

  /**
   * Returns current indentation string.
   * @return {String}
   */
  getIndent(): string {
    return repeat(this.indent, this.indentTypes.length)
  }

  /**
   * Increases indentation by one top-level indent.
   */
  increaseTopLevel(): void {
    this.indentTypes.push(INDENT_TYPE_TOP_LEVEL)
  }

  /**
   * Increases indentation by one block-level indent.
   */
  increaseBlockLevel(): void {
    this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL)
  }

  /**
   * Decreases indentation by one top-level indent.
   * Does nothing when the previous indent is not top-level.
   */
  decreaseTopLevel(): void {
    if (last(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
      this.indentTypes.pop()
    }
  }

  /**
   * Decreases indentation by one block-level indent.
   * If there are top-level indents within the block-level indent,
   * throws away these as well.
   */
  decreaseBlockLevel(): void {
    while (this.indentTypes.length > 0) {
      const type = this.indentTypes.pop()
      if (type !== INDENT_TYPE_TOP_LEVEL) {
        break
      }
    }
  }

  resetIndentation(): void {
    this.indentTypes = []
  }
}
