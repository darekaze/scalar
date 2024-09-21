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
  cmd.option('--verbose', 'Get the full schema in the error output')
  cmd.action(async (inputArgument: string, { verbose }) => {
    const startTime = performance.now()

    // Read file
    const input = useGivenFileOrConfiguration(inputArgument)

    // Validate
    const result = check(input)

    const endTime = performance.now()

    console.log()
    console.log(
      kleur.blue('Config file checked'),
      kleur.grey(
        `in ${kleur.white(
          `${kleur.bold(`${Math.round(endTime - startTime)}`)} ms`,
        )}`,
      ),
    )
    console.log()

    if (result.valid) {
      console.log(kleur.green('Success'))
      console.log(kleur.green('Matches the Scalar config specifications'))
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
        if (verbose) {
          console.log()
          console.log(kleur.red(`expected schema:`))
          console.log(JSON.stringify(error.schema, null, 3))
          console.log()
        }
      })

      if (!verbose) {
        console.log()
        console.log(
          `Add the ${kleur.yellow('--verbose')} flag for schema error output`,
        )
        console.log()
      }
      process.exit(1)
    }
  })
  return cmd
}
