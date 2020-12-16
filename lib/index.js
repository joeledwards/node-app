module.exports = app

const { resolveModules } = require('./modules')

function app (entry, options) {
  if (typeof entry === 'function') {
    return run(options, entry)
  } else if (typeof options === 'function') {
    return run(entry, options)
  } else {
    // Permit "currying"
    const curryOptions = options || entry
    return entry => run(curryOptions, entry)
  }
}

async function run (options, entry) {
  const unhandled = require('@buzuli/unhandled')

  const {
    handle = { exit: true },
    modules = {},
    logger = console
  } = options || {}

  unhandled(handle)

  try {
    const resolvedModules = await resolveModules(modules)

    const context = {
      modules: resolvedModules,
      logger
    }

    await entry(context)
  } catch (error) {
    console.error('Fatal:', error)
    process.exit(1)
  }
}
