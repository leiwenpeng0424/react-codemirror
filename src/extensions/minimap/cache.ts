import { Token } from "./drawer"

export default class TokenCache {
  private tokens: Map<string, Token> = new Map()

  get(key: string) {
    return this.tokens.get(key)
  }

  set(key: string, value: Token) {
    this.tokens.set(key, value)
  }

  clear() {}
}
