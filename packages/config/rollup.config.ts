import { createRollupConfig, findEntryPoints } from '@scalar/build-tooling'
import { builtinModules } from 'node:module'

export default createRollupConfig({
  typescript: true,
  options: {
    input: await findEntryPoints({ allowCss: false }),
    external: [...builtinModules, ...builtinModules.map((m) => `node:${m}`)],
  },
})
