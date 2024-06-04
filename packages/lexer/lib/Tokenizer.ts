import TokenBuffer from "./TokenBuffer";
import type { IStatesConfig, IStateKey, IConfig, ITokenTypeGenerator, IToken, TOKEN_TYPE } from "./types";
import Position from './Position'
import { NEW_LINE, SPACE } from "./config";

export default class Tokenizer {
  #tokenBuffer = new TokenBuffer()
  #statesConfig: IStatesConfig
  #initialState: IStateKey
  #state: IStateKey
  #position = new Position()
  #buffer = ''

  constructor(config: IConfig) {
    this.#statesConfig = config.states
    this.#initialState = config.initialState
    this.#state = config.initialState
  }

  getTokenBuffer() {
    return this.#tokenBuffer
  }

  parse(code: string) {
    for (let i = 0; i < code.length; i++) {
      const char = code[i]
      this.consume(char)
    }
    this.end()

    return this.#tokenBuffer.getTokens()
  }

  syntaxError(errorMsg: string) {
    const { line, column } = this.#position.getCurrentPosition()
    const msg = `${errorMsg} at line ${line}, column ${column}`
    return new SyntaxError(msg)
  }

  end() {
    if (this.#state === this.#initialState) {
      if (this.#buffer) {
        throw this.syntaxError('Unexpected EOF')
      }
      return
    }

    const currentStateConfig = this.#statesConfig[this.#state]

    if (currentStateConfig.isEndable && currentStateConfig.tokenType) {
      this.addToken(currentStateConfig.tokenType)
    }
  }

  addToken(tokeType: TOKEN_TYPE | ITokenTypeGenerator) {
    const startLocation = this.#position.getPrevLocation()
    const endLocation = this.#position.getCurrentPosition()
    const token: IToken = {
      type: typeof tokeType === 'function' ? tokeType(this.#buffer) : tokeType,
      value: this.#buffer,
      range: {
        start: startLocation!,
        end: endLocation
      }
    }
    this.#tokenBuffer.write(token)
  }

  reset() {
    this.#state = this.#initialState
    this.#buffer = ''
  }

  consume(char: string) {
    if (
      (char === SPACE || NEW_LINE.includes(char))
      && this.#state === this.#initialState
    ) {
      this.#position.move(char)
      return
    }

    const currentStateConfig = this.#statesConfig[this.#state]
    if (!currentStateConfig) {
      throw new Error(`Missing state config for ${this.#state}`)
    }

    const transition = currentStateConfig.transition
    if (!transition) {
      if (currentStateConfig.isEndable) {
        if (currentStateConfig.tokenType) {
          this.addToken(currentStateConfig.tokenType)
        }
        this.reset()
        this.consume(char)
        return
      }

      throw this.syntaxError(`Unexpected character ${char}`)
    }

    const targetTransition = transition.find(({ checker }) => {
      if (typeof checker === 'string') {
        return char === checker
      }

      if (checker instanceof RegExp) {
        return checker.test(char)
      }

      return checker(char, this.#buffer)
    })

    if (!targetTransition) {
      if (currentStateConfig.isEndable) {
        if (currentStateConfig.tokenType) {
          this.addToken(currentStateConfig.tokenType)
        }
        this.reset()
        this.consume(char)
        return
      }

      this.#position.move(char)
      throw this.syntaxError(`Invalid or unexpected token ${char}`)
    }

    this.#position.move(char)
    // when state start to transfer from initial state to other state, mark current position
    if (
      this.#state === this.#initialState
      && targetTransition?.state !== this.#initialState
    ) {
      this.#position.markPosition()
    }

    this.#state = targetTransition!.state
    this.#buffer += char
  }
}