import Tokenizer from '../src/Tokenizer'
import config from '../src/config'

const testCases: { code: string; description: string }[] = [
  {
    code: `abc`,
    description: 'it should be identifier',
  },
  {
    code: `'abc'`,
    description: 'it should be string',
  },
  {
    code: `1234.45`,
    description: 'it should be number',
  },
  {
    code: `
      /* 行内注释 */
      /*
      块级注释
      */
    `,
    description: 'it should be comment',
  },
  {
    code: `
      // test function
      function test(a, b) {
        console.log(a)
        return a + b;
      }
      concat(接口.姓, 接口.名)
    `,
    description: 'it should be custom code',
  },
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
