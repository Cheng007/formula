import type { IConfig } from "./types";
import { TOKEN_TYPE, State } from './types'

export const SPACE = ' '
export const NEW_LINE = ['\n', '\t', '\r']

const config: IConfig = {
  initialState: State.INITIAL,
  states: {
    [State.INITIAL]: {
      isEndable: false,
      transition: [
        {
          state: State.NUMBER,
          checker: /[0-9]/
        },
        {
          state: State.START_STRING,
          checker: "'"
        },
        {
          state: State.IDENTIFIER,
          checker: /[a-zA-Z]/
        },
        {
          state: State.LEFT_PAREN,
          checker: '('
        },
        {
          state: State.RIGHT_PAREN,
          checker: ')'
        },
        {
          state: State.LEFT_SQUARE_BRACKET,
          checker: '['
        },
        {
          state: State.RIGHT_SQUARE_BRACKET,
          checker: ']'
        },
        {
          state: State.LEFT_CURLY_BRACE,
          checker: '{'
        },
        {
          state: State.RIGHT_CURLY_BRACE,
          checker: '}'
        },
        {
          state: State.SEMI_COLON,
          checker: ';'
        },
        {
          state: State.COMMA,
          checker: ','
        },
        {
          state: State.DOT,
          checker: '.'
        },
        {
          state: State.COLON,
          checker: ':'
        },
        {
          state: State.PLUS,
          checker: '+'
        },
        {
          state: State.MINUS,
          checker: '-'
        },
        {
          state: State.MULTIPLY,
          checker: '*'
        },
        {
          state: State.DIVIDE,
          checker: '/'
        },
        {
          state: State.ASSIGN,
          checker: '='
        },
        {
          state: State.LESS_THAN,
          checker: '<'
        },
        {
          state: State.GREATER_THAN,
          checker: '>'
        },
      ]
    },
    [State.NUMBER]: {
      isEndable: true,
      tokenType: TOKEN_TYPE.NUMBER,
      transition: [
        {
          state: State.NUMBER,
          checker: /[0-9\.]/
        }
      ]
    },
    [State.START_STRING]: {
      isEndable: false,
      transition: [
        {
          state: State.START_STRING,
          checker: /[^']/
        },
        {
          state: State.STRING,
          checker: "'"
        }
      ]
    },
    [State.STRING]: {
      isEndable: true,
      tokenType: TOKEN_TYPE.STRING,
    },
    [State.START_IDENTIFIER]: {
      isEndable: true,
      transition: [
        {
          state: State.IDENTIFIER,
          checker: /[a-zA-Z_0-9]/
        }
      ]
    },
    [State.IDENTIFIER]: {
      isEndable: true,
      tokenType: TOKEN_TYPE.IDENTIFIER,
      transition: [
        {
          state: State.IDENTIFIER,
          checker: /[a-zA-Z]/
        }
      ]
    },
    [State.LEFT_PAREN]: {
      isEndable: true,
      tokenType: State.LEFT_PAREN,
    },
    [State.RIGHT_PAREN]: {
      isEndable: true,
      tokenType: State.RIGHT_PAREN,
    },
    [State.LEFT_SQUARE_BRACKET]: {
      isEndable: true,
      tokenType: State.LEFT_SQUARE_BRACKET,
    },
    [State.RIGHT_SQUARE_BRACKET]: {
      isEndable: true,
      tokenType: State.RIGHT_SQUARE_BRACKET,
    },
    [State.LEFT_CURLY_BRACE]: {
      isEndable: true,
      tokenType: State.LEFT_CURLY_BRACE,
    },
    [State.RIGHT_CURLY_BRACE]: {
      isEndable: true,
      tokenType: State.RIGHT_CURLY_BRACE,
    },
    [State.SEMI_COLON]: {
      isEndable: true,
      tokenType: State.SEMI_COLON,
    },
    [State.COMMA]: {
      isEndable: true,
      tokenType: State.COMMA,
    },
    [State.DOT]: {
      isEndable: true,
      tokenType: State.DOT,
    },
    [State.COLON]: {
      isEndable: true,
      tokenType: State.COLON,
    },

    [State.PLUS]: {
      isEndable: true,
      tokenType: State.PLUS,
      transition: [
        {
          state: State.PLUS_PLUS,
          checker: '+'
        },
        {
          state: State.PLUS_ASSIGN,
          checker: '=',
        }
      ]
    },
    [State.PLUS_PLUS]: {
      isEndable: true,
      tokenType: State.PLUS_PLUS,
    },
    [State.MINUS]: {
      isEndable: true,
      tokenType: State.MINUS,
      transition: [
        {
          state: State.MINUS_MINUS,
          checker: '-'
        },
        {
          state: State.MINUS_ASSIGN,
          checker: '=',
        }
      ]
    },
    [State.MINUS_MINUS]: {
      isEndable: true,
      tokenType: State.MINUS_MINUS,
    },
    [State.MULTIPLY]: {
      isEndable: true,
      tokenType: State.MULTIPLY,
      transition: [
        {
          state: State.MULTIPLY_ASSIGN,
          checker: '='
        }
      ]
    },
    [State.DIVIDE]: {
      isEndable: true,
      tokenType: State.DIVIDE,
      transition: [
        {
          state: State.DIVIDE_ASSIGN,
          checker: '='
        },
        {
          state: State.LINE_COMMENT,
          checker: '/'
        },
        {
          state: State.START_BLOCK_COMMENT,
          checker: '*'
        }
      ]
    },
    [State.PLUS_ASSIGN]: {
      isEndable: true,
      tokenType: State.PLUS_ASSIGN,
    },
    [State.MINUS_ASSIGN]: {
      isEndable: true,
      tokenType: State.MINUS_ASSIGN,
    },
    [State.MULTIPLY_ASSIGN]: {
      isEndable: true,
      tokenType: State.MULTIPLY_ASSIGN,
    },
    [State.DIVIDE_ASSIGN]: {
      isEndable: true,
      tokenType: State.DIVIDE_ASSIGN,
    },
    [State.ASSIGN]: {
      isEndable: true,
      tokenType: State.ASSIGN,
    },
    [State.LESS_THAN]: {
      isEndable: true,
      tokenType: State.LESS_THAN,
      transition: [
        {
          state: State.LESS_EQUAL_THAN,
          checker: '='
        }
      ]
    },
    [State.LESS_EQUAL_THAN]: {
      isEndable: true,
      tokenType: State.LESS_EQUAL_THAN,
    },
    [State.GREATER_THAN]: {
      isEndable: true,
      tokenType: State.GREATER_THAN,
      transition: [
        {
          state: State.GREATER_EQUAL_THAN,
          checker: '='
        }
      ]
    },
    [State.GREATER_EQUAL_THAN]: {
      isEndable: true,
      tokenType: State.GREATER_EQUAL_THAN,
    },
    [State.LINE_COMMENT]: {
      isEndable: true,
      tokenType: State.LINE_COMMENT,
      transition: [
        {
          state: State.LINE_COMMENT,
          checker: (char: string) => !NEW_LINE.includes(char)
        }
      ]
    },
    [State.START_BLOCK_COMMENT]: {
      isEndable: false,
      transition: [
        {
          state: State.BLOCK_COMMENT,
          checker: (char, buffer) => /^\/\*[\d\D]+\*\/$/.test(buffer + char),
        },
        {
          state: State.START_BLOCK_COMMENT,
          checker: (char, buffer) => /^\/\*/.test(buffer + char)
        },
      ]
    },
    [State.BLOCK_COMMENT]: {
      isEndable: true,
      tokenType: State.BLOCK_COMMENT
    }
  }
}

export default config