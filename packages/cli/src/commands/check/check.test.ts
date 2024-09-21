import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { ScalarCli } from '../../../tests/invoke-cli'

describe('check', () => {
  it('checks the given json file', () => {
    const file = fileURLToPath(new URL('./valid.json', import.meta.url))
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', file])
    logs.should.contain('Success')
    console.log(logs.logOutput())
    expect(exitCode).toBe(0)
  })
  it('checks the invalid json file', () => {
    const file = fileURLToPath(new URL('./invalid.json', import.meta.url))
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', file])
    console.log(logs.logOutput())
    logs.should.contain('--verbose')
    expect(exitCode).toBe(1)
  })
  it('verbose error output', () => {
    const file = fileURLToPath(new URL('./invalid.json', import.meta.url))
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', file, '--verbose'])
    console.log(logs.logOutput())

    logs.should.contain('expected schema:')
    expect(exitCode).toBe(1)
  })
})
