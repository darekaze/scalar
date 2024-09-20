import { Value } from '@sinclair/typebox/value'
import fs from 'node:fs'

import { ScalarConfigType } from './configTypes'

/** check scalar config file using the generated schema */
export function check(filePath: string) {
  const scalarConfigFile = fs.readFileSync(process.cwd() + filePath, 'utf8')
  const scalarConfigJson = JSON.parse(scalarConfigFile)

  /** Check if config is valid */
  const isValidConfig = Value.Check(ScalarConfigType, scalarConfigJson)
  if (isValidConfig) return { valid: isValidConfig, errors: [] }

  /** If config is NOT valid, get errors and format them */
  const rawErrors = [...Value.Errors(ScalarConfigType, scalarConfigJson)]
  const formattedErrors = rawErrors.map((error) => {
    return {
      type: error.type,
      property: error.path,
      message: error.message,
      // TODO: add this conditionally if the user wants a verbose output
      // schema: error.schema,
    }
  })

  return {
    valid: false,
    errors: formattedErrors,
  }
}
