import Tokenizer from "../lib/Tokenizer";
import config from '../lib/config';

// test for 行注释、块注释

const code = `
  /* 放大 */fda
  /*
  fa
  sfds*/fdsa
`

const testCases: Array<{ code: string, description: string }> = [
  {
    code: `abc`,
    description: 'it should be identifier'
  },
  {
    code: `'abc'`,
    description: 'it should be string'
  },
  {
    code: `1234.45`,
    description: 'it should be number'
  },
  {
    code: `
      /* 行内注释 */
      /*
      块级注释
      */
    `,
    description: 'it should be comment'
  }
]

describe('Token with config', () => {
  testCases.forEach(({ code, description }) => {
    test(description, () => {
      const tokenizer = new Tokenizer(config)
      tokenizer.parse(code)
      const tokenBuffer = tokenizer.getTokenBuffer()
      expect(tokenBuffer.getTokens()).toMatchSnapshot()
    })
  })
})
