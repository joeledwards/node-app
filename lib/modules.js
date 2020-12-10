module.exports = {
  resolveModules
}

async function resolveModules (modules) {
  if (modules == null) {
    return {}
  }

  const keys = []
  const promises = []

  for (const [key, supplier] of Object.entries(modules)) {
    keys.push(key)
    promises.push((typeof supplier === 'function') ? supplier() : supplier)
  }

  const values = await Promise.all(promises)

  const resolvedModules = {}

  keys.forEach((key, idx) => { resolvedModules[key] = values[idx] })

  return resolvedModules
}
