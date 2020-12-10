module.exports = app

async function app (entry, options = {}) {
  const unhandled = require('@buzuli/unhandled')

  const {
    handle = { exit = true },
    modules = {}
  } = options

  unhandled(handle)

  try {
    const resolvedModules = await resolveModules(modules)

    const context = {
      modules: resolvedModules
    } 

    await entry(context)
  } catch (error) {
    console.error('Fatal:', error)
    process.exit(1)
  }
}

