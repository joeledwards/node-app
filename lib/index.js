module.exports = app

async function app (entry, options = {}) {
  const unhandled = require('@buzuli/unhandled')

  const context = {}

  unhandled({ exit: true })

  try {
    await entry(context)
  } catch (error) {
    console.error('Fatal:', error)
    process.exit(1)
  }
}
