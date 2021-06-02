import includes from "lodash/includes"
import tokenTypes from "./tokenTypes"
import Indentation from "./Indentation"
import InlineBlock from "./InlineBlock"
import Params from "./Params"
import { SqlFormatConfig } from "../StandardSqlFormatter"
import Tokenizer, { Token } from "./Tokenizer"

const trimSpacesEnd = (str: string): string =>
  str.replace(/[ \t]+$/u, "")

export default class Formatter {
  cfg: SqlFormatConfig
  indentation: Indentation
  inlineBlock: InlineBlock
  params: Params
  tokenizer: Tokenizer
  tokenOverride: (
    token: Token,
    previousReservedWord: { [word: string]: string }
  ) => Token
  previousReservedWord: { [word: string]: string }
  tokens: Token[]
  index: number
  /**
   * @param {Object} cfg
   *  @param {String} cfg.language
   *  @param {String} cfg.indent
   *  @param {Bool} cfg.uppercase
   *  @param {Integer} cfg.linesBetweenQueries
   *  @param {Object} cfg.params
   * @param {Tokenizer} tokenizer
   */
  constructor(
    cfg: SqlFormatConfig,
    tokenizer: Tokenizer,
    tokenOverride?: (token: Token) => Token
  ) {
    this.cfg = cfg || {}
    this.indentation = new Indentation(this.cfg.indent)
    this.inlineBlock = new InlineBlock()
    this.params = new Params(this.cfg.params)
    this.tokenizer = tokenizer
    this.tokenOverride = tokenOverride
    this.previousReservedWord = {}
    this.tokens = []
    this.index = 0
  }

  /**
   * Formats whitespace in a SQL string to make it easier to read.
   *
   * @param {String} query The SQL query string
   * @return {String} formatted query
   */
  format(query: string): string {
    this.tokens = this.tokenizer.tokenize(query)
    const formattedQuery = this.getFormattedQueryFromTokens()

    return formattedQuery.trim()
  }

  getFormattedQueryFromTokens(): string {
    let formattedQuery = ""

    this.tokens.forEach((token, index) => {
      this.index = index

      if (this.tokenOverride)
        token =
          this.tokenOverride(token, this.previousReservedWord) ||
          token

      if (token.type === tokenTypes.WHITESPACE) {
        // ignore (we do our own whitespace formatting)
      } else if (token.type === tokenTypes.LINE_COMMENT) {
        formattedQuery = this.formatLineComment(token, formattedQuery)
      } else if (token.type === tokenTypes.BLOCK_COMMENT) {
        formattedQuery = this.formatBlockComment(
          token,
          formattedQuery
        )
      } else if (token.type === tokenTypes.RESERVED_TOP_LEVEL) {
        formattedQuery = this.formatTopLevelReservedWord(
          token,
          formattedQuery
        )
        this.previousReservedWord = token
      } else if (
        token.type === tokenTypes.RESERVED_TOP_LEVEL_NO_INDENT
      ) {
        formattedQuery = this.formatTopLevelReservedWordNoIndent(
          token,
          formattedQuery
        )
        this.previousReservedWord = token
      } else if (token.type === tokenTypes.RESERVED_NEWLINE) {
        formattedQuery = this.formatNewlineReservedWord(
          token,
          formattedQuery
        )
        this.previousReservedWord = token
      } else if (token.type === tokenTypes.RESERVED) {
        formattedQuery = this.formatWithSpaces(token, formattedQuery)
        this.previousReservedWord = token
      } else if (token.type === tokenTypes.OPEN_PAREN) {
        formattedQuery = this.formatOpeningParentheses(
          token,
          formattedQuery
        )
      } else if (token.type === tokenTypes.CLOSE_PAREN) {
        formattedQuery = this.formatClosingParentheses(
          token,
          formattedQuery
        )
      } else if (token.type === tokenTypes.PLACEHOLDER) {
        formattedQuery = this.formatPlaceholder(token, formattedQuery)
      } else if (token.value === ",") {
        formattedQuery = this.formatComma(token, formattedQuery)
      } else if (token.value === ":") {
        formattedQuery = this.formatWithSpaceAfter(
          token,
          formattedQuery
        )
      } else if (token.value === ".") {
        formattedQuery = this.formatWithoutSpaces(
          token,
          formattedQuery
        )
      } else if (token.value === ";") {
        formattedQuery = this.formatQuerySeparator(
          token,
          formattedQuery
        )
      } else {
        formattedQuery = this.formatWithSpaces(token, formattedQuery)
      }
    })
    return formattedQuery
  }

  formatLineComment(token: Token, query: string): string {
    return this.addNewline(query + token.value)
  }

  formatBlockComment(token: Token, query: string): string {
    return this.addNewline(
      this.addNewline(query) + this.indentComment(token.value)
    )
  }

  indentComment(comment: string): string {
    return comment.replace(
      /\n[ \t]*/gu,
      "\n" + this.indentation.getIndent() + " "
    )
  }

  formatTopLevelReservedWordNoIndent(
    token: Token,
    query: string
  ): string {
    this.indentation.decreaseTopLevel()
    query =
      this.addNewline(query) +
      this.equalizeWhitespace(this.formatReservedWord(token.value))
    return this.addNewline(query)
  }

  formatTopLevelReservedWord(token: Token, query: string): string {
    this.indentation.decreaseTopLevel()

    query = this.addNewline(query)

    this.indentation.increaseTopLevel()

    query += this.equalizeWhitespace(
      this.formatReservedWord(token.value)
    )
    return this.addNewline(query)
  }

  formatNewlineReservedWord(token: Token, query: string): string {
    return (
      this.addNewline(query) +
      this.equalizeWhitespace(this.formatReservedWord(token.value)) +
      " "
    )
  }

  // Replace any sequence of whitespace characters with single space
  equalizeWhitespace(string: string): string {
    return string.replace(/\s+/gu, " ")
  }

  // Opening parentheses increase the block indent level and start a new line
  formatOpeningParentheses(token: Token, query: string): string {
    // Take out the preceding space unless there was whitespace there in the original query
    // or another opening parens or line comment
    const preserveWhitespaceFor = [
      tokenTypes.WHITESPACE,
      tokenTypes.OPEN_PAREN,
      tokenTypes.LINE_COMMENT,
    ]
    if (!includes(preserveWhitespaceFor, this.previousToken().type)) {
      query = trimSpacesEnd(query)
    }
    query += this.cfg.uppercase
      ? token.value.toUpperCase()
      : token.value

    this.inlineBlock.beginIfPossible(this.tokens, this.index)

    if (!this.inlineBlock.isActive()) {
      this.indentation.increaseBlockLevel()
      query = this.addNewline(query)
    }
    return query
  }

  // Closing parentheses decrease the block indent level
  formatClosingParentheses(token: Token, query: string): string {
    token.value = this.cfg.uppercase
      ? token.value.toUpperCase()
      : token.value
    if (this.inlineBlock.isActive()) {
      this.inlineBlock.end()
      return this.formatWithSpaceAfter(token, query)
    } else {
      this.indentation.decreaseBlockLevel()
      return this.formatWithSpaces(token, this.addNewline(query))
    }
  }

  formatPlaceholder(token: Token, query: string): string {
    return query + this.params.get(token) + " "
  }

  // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)
  formatComma(token: Token, query: string): string {
    query = trimSpacesEnd(query) + token.value + " "

    if (this.inlineBlock.isActive()) {
      return query
    } else if (/^LIMIT$/iu.test(this.previousReservedWord.value)) {
      return query
    } else {
      return this.addNewline(query)
    }
  }

  formatWithSpaceAfter(token: Token, query: string): string {
    return trimSpacesEnd(query) + token.value + " "
  }

  formatWithoutSpaces(token: Token, query: string): string {
    return trimSpacesEnd(query) + token.value
  }

  formatWithSpaces(token: Token, query: string): string {
    const value: string =
      token.type === "reserved"
        ? this.formatReservedWord(token.value)
        : token.value
    return query + value + " "
  }

  formatReservedWord(value: string): string {
    return this.cfg.uppercase ? value.toUpperCase() : value
  }

  formatQuerySeparator(token: Token, query: string): string {
    this.indentation.resetIndentation()
    return (
      trimSpacesEnd(query) +
      token.value +
      "\n".repeat(this.cfg.linesBetweenQueries || 1)
    )
  }

  addNewline(query: string): string {
    query = trimSpacesEnd(query)
    if (!query.endsWith("\n")) query += "\n"
    return query + this.indentation.getIndent()
  }

  previousToken(offset = 1): Token | Record<string, unknown> {
    return this.tokens[this.index - offset] || {}
  }
}
