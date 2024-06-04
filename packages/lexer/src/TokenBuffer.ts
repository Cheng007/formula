import type { IToken } from './types'

export default class TokenBuffer {
  #tokens: IToken[] = []
  #index = 0

  peek() {
    return this.#tokens[this.#index]
  }

  read() {
    const currentToken = this.#tokens[this.#index]
    const nextIndex =
      this.#index < this.#tokens.length ? ++this.#index : this.#tokens.length
    this.#index = nextIndex
    return currentToken
  }

  unread() {
    const lastIndex = --this.#index
    this.#index = lastIndex
    return this.#tokens[lastIndex]
  }

  write(token: IToken) {
    this.#tokens.push(token)
  }

  getIndex() {
    return this.#index
  }

  setIndex(index: number) {
    this.#index = index
  }

  getTokens() {
    return this.#tokens
  }

  isEmpty() {
    return this.#index === this.#tokens.length
  }
}
