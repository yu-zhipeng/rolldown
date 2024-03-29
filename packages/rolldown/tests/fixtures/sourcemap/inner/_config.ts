// cSpell:disable
import path from 'node:path'
import { expect } from 'vitest'
import { getOutputFileNames } from '@tests/utils'
import { defineTest } from '@tests'

export default defineTest({
  config: {
    input: [path.join(__dirname, 'main.js')],
    output: {
      sourcemap: true,
    },
  },
  afterTest: function (output) {
    expect(getOutputFileNames(output)).toMatchInlineSnapshot(`
      [
        "main.js",
        "main.js.map",
      ]
    `)
    // include map comment
    expect(output.output[0].code).contains('//# sourceMappingURL=main.js.map')
    expect(output.output[0].sourcemapFileName).toBe('main.js.map')
    expect(output.output[0].map).toBeDefined()
    // @ts-expect-error
    const map = JSON.parse(output.output[1].source)
    expect(map.file).toMatchInlineSnapshot(`"main.js"`)
    expect(map.mappings).toMatchInlineSnapshot(
      `";;AAAO,MAAMA,MAAM;;;ACEnB,QAAQ,IAAIA,IAAI"`,
    )
  },
})
