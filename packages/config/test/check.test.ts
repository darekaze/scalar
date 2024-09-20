import { describe, expect, it } from 'vitest'

import { check } from '../src/index'

describe('check', () => {
  it('checks the valid json file', () => {
    const result = check('/test/valid.json')
    console.log(JSON.stringify(result, null, 3))
    expect(result.valid).toBe(true)
    expect(result.errors.length).toBe(0)
  })
  it('checks the invalid json file', () => {
    const result = check('/test/invalid.json')
    console.log(JSON.stringify(result, null, 3))
    expect(result.valid).toBe(false)

    console.log(result.errors)
    expect(result.errors).toBeDefined()
    expect(result.errors.length).toEqual(6)
  })
  it('checks the invalid json file missing subdomain', () => {
    const result = check('/test/invalid-subdomain.json')
    expect(result.valid).toBe(false)
    expect(result.errors.length).toEqual(2)
    expect(result.errors[0].message).toEqual('Expected required property')
    expect(result.errors[1].message).toEqual('Expected string')
  })
})
