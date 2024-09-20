import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { ScalarCli } from '../../../tests/invoke-cli'

describe('check', () => {
  it('checks the given json file', () => {
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', '/src/commands/check/valid.json'])
    logs.should.contain('Success')
    console.log(logs.logOutput())
    expect(exitCode).toBe(0)
  })
  it('checks the invalid json file', () => {
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', '/src/commands/check/invalid.json'])
    console.log(logs.logOutput())
    expect(exitCode).toBe(1)
  })
  it.todo('verbose error output', () => {
    const [exitCode, logs] = ScalarCli()
      .setCwd(path.resolve('./'))
      .invoke(['check', '/src/commands/check/invalid.json', ' -v'])
    console.log(logs.logOutput())
    expect(exitCode).toBe(1)
  })
})
