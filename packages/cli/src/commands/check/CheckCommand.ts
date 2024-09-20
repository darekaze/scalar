import { check } from '@scalar/config'
import { Command } from 'commander'
import kleur from 'kleur'

import { useGivenFileOrConfiguration } from '../../utils'

/**
 * Lint users scalar configs (scalar.config.json files)
 */
export function CheckCommand() {
  const cmd = new Command('check')

  cmd.description('Check users scalar configs')
  cmd.argument('[file]', 'File to check')
  cmd.action(async (inputArgument: string) => {
    const startTime = performance.now()

    // Read file
    const input = useGivenFileOrConfiguration(inputArgument)

    // Validate
    const result = check(input)

    if (result.valid) {
      console.log(kleur.green('Success'))
      console.log(kleur.green('Matches the Scalar config specifications'))

      const endTime = performance.now()

      console.log()
      console.log(
        kleur.green('File validated'),
        kleur.grey(
          `in ${kleur.white(
            `${kleur.bold(`${Math.round(endTime - startTime)}`)} ms`,
          )}`,
        ),
      )
      console.log()
    } else {
      console.error(kleur.red('Error'))
      console.error(
        kleur.red('File doesn’t match the Scalar config specification.'),
      )
      console.log()
      console.error(
        kleur.red(
          `${kleur.bold(
            `${result.errors.length} error${
              result.errors && result.errors.length > 1 ? 's' : ''
            }`,
          )} found.`,
        ),
      )
      console.log()
      result.errors.forEach((error) => {
        console.error(
          kleur.red(`${error.message} on property ${error.property}`),
        )
      })
      process.exit(1)
    }
  })
  return cmd
}
