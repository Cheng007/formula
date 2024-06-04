export enum TOKEN_TYPE {
  // 数字
  NUMBER = 'NUMBER',
  // 字符串
  STRING = 'STRING',
  // 标识符：字母、数字、下划线组成，不能以数字开头
  IDENTIFIER = 'IDENTIFIER',

  // 左括号 (
  LEFT_PAREN = 'LEFT_PAREN',
  // 右括号 )
  RIGHT_PAREN = 'RIGHT_PAREN',
  // 左方括号 [
  LEFT_SQUARE_BRACKET = 'LEFT_SQUARE_BRACKET',
  // 右方扩号 ]
  RIGHT_SQUARE_BRACKET = 'RIGHT_SQUARE_BRACKET',
  // 左花括号 { 
  LEFT_CURLY_BRACE = 'LEFT_CURLY_BRACE',
  // 右花括号 }
  RIGHT_CURLY_BRACE = 'RIGHT_CURLY_BRACE',
  // 分号 ;
  SEMI_COLON = 'SEMI_COLON',
  // 逗号 ,
  COMMA = 'COMMA',
  // 点号 .
  DOT = 'DOT',
  // 冒号 :
  COLON = 'COLON',

  // 数学运算符
  // 加 +
  PLUS = 'PLUS',
  // 加加 ++
  PLUS_PLUS = 'PLUS_PLUS',
  // 减 -
  MINUS = 'MINUS',
  // 减减 --
  MINUS_MINUS = 'MINUS_MINUS',
  // 乘 *
  MULTIPLY = 'MULTIPLY',
  // 除 /
  DIVIDE = 'DIVIDE',
  // 加等于 +=
  PLUS_ASSIGN = 'PLUS_ASSIGN',
  // 减等于 -=
  MINUS_ASSIGN = 'MINUS_ASSIGN',
  // 乘等于 *=
  MULTIPLY_ASSIGN = 'MULTIPLY_ASSIGN',
  // 除等于 /=
  DIVIDE_ASSIGN = 'DIVIDE_ASSIGN',
  // 等于 =
  ASSIGN = 'ASSIGN',
  // 小于 <
  LESS_THAN = 'LESS_THAN',
  // 小于等于 <=
  LESS_EQUAL_THAN = 'LESS_EQUAL_THAN',
  // 大于 >
  GREATER_THAN = 'GREATER_THAN',
  // 大于等于 >=
  GREATER_EQUAL_THAN = 'GREATER_EQUAL_THAN',

  // 行级注释 //
  LINE_COMMENT = 'LINE_COMMENT',
  // 块级注释 /* */
  BLOCK_COMMENT = 'BLOCK_COMMENT',
}

export enum ExtralState {
  INITIAL = 'INITIAL',
  // 字符串开始状态：单引号'
  START_STRING = 'START_STRING',
  // 标识符开始状态：字母或下划线开头 /[a-zA-Z_]/
  START_IDENTIFIER = 'START_IDENTIFIER',
  // 块级注释开始状态：开头字符 /*
  START_BLOCK_COMMENT = 'START_BLOCK_COMMENT',
}

export const State = {
  ...TOKEN_TYPE,
  ...ExtralState,
}

export type IStateKey = keyof typeof State

export interface IToken {
  type: TOKEN_TYPE
  value: string
  range: IPositionRange
}

export interface IPosition {
  column: number
  line: number
}

export interface IPositionRange {
  start: IPosition
  end: IPosition
}

export type ITokenTypeGenerator = (value: string) => TOKEN_TYPE
export type IStateConfig = {
  isEndable: boolean
  tokenType?: TOKEN_TYPE | ITokenTypeGenerator
  transition?: ITransition[]
}
export type IStatesConfig = Record<IStateKey, IStateConfig>

interface ITransition {
  checker: RegExp | string | ((char: string, buffer: string) => boolean)
  state: IStateKey
}

export type IConfig = {
  states: IStatesConfig
  initialState: IStateKey
}
