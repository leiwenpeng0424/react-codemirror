import { Token } from "./Tokenizer"

/**
 * Handles placeholder replacement with given params.
 */
export default class Params {
  index: number
  params: { [key: string]: string }

  /**
   * @param {Object} params
   */
  constructor(params: { [key: string]: string }) {
    this.params = params
    this.index = 0
  }

  /**
   * Returns param value that matches given placeholder with param key.
   * @param {Object} token
   *   @param {String} token.key Placeholder key
   *   @param {String} token.value Placeholder value
   * @return {String} param or token.value when params are missing
   */
  get({ key, value }: Token): string {
    if (!this.params) {
      return value
    }
    if (key) {
      return this.params[key]
    }
    return this.params[this.index++]
  }
}
