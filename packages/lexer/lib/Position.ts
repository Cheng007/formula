import { NEW_LINE } from './config'
import type { IPosition } from './types'

export default class Position {
  #line = 1
  #column = 0
  #prevPosition: IPosition = {
    line: 1,
    column: 0,
  }

  move(char: string) {
    if (NEW_LINE.includes(char)) {
      this.#line++
      this.#column = 0
    } else {
      this.#column++
    }
  }

  getCurrentPosition(): IPosition {
    return {
      line: this.#line,
      column: this.#column,
    }
  }

  markPosition() {
    this.#prevPosition = {
      line: this.#line,
      column: this.#column,
    }
  }

  getPrevLocation() {
    return this.#prevPosition
  }
}
