import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { check } from '../src/index'

describe('check', () => {
  it('checks the valid json file', () => {
    const file = fileURLToPath(new URL('valid.json', import.meta.url))
    const result = check(file)

    expect(result.valid).toBe(true)
    expect(result.errors.length).toBe(0)
  })
  it('checks the invalid json file', () => {
    const file = fileURLToPath(new URL('./invalid.json', import.meta.url))
    const result = check(file)

    expect(result.valid).toBe(false)
    expect(result.errors.length).toEqual(6)
  })
  it('checks the invalid json file missing subdomain', () => {
    const file = fileURLToPath(
      new URL('./invalid-subdomain.json', import.meta.url),
    )
    const result = check(file)

    expect(result.valid).toBe(false)
    expect(result.errors.length).toEqual(2)
    expect(result.errors[0].message).toEqual('Expected required property')
    expect(result.errors[1].message).toEqual('Expected string')
  })
})
