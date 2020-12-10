const tap = require('tap')
const app = require('../lib')

tap.test('app should invoke an entry point', async assert => {
  let didRun = false
  await app(async () => { didRun = true })
  assert.equal(didRun, true)
})

tap.test('options and entry may be swapped', async assert => {
  ;await (async () => {
    let didRun = false
    await app({}, async () => { didRun = true })
    assert.equal(didRun, true)
  })()

  await (async () => {
    let didRun = false
    await app(null, async () => { didRun = true })
    assert.equal(didRun, true)
  })()
})

tap.test('app permit currying with options first', async assert => {
  ;await (async () => {
    let didRun = false
    console.info('Try curry!')
    await app({})(async () => { didRun = true })
    assert.equal(didRun, true)
  })()

  await (async () => {
    let didRun = false
    await app(null)(async () => { didRun = true })
    assert.equal(didRun, true)
  })()

  await (async () => {
    let didRun = false
    await app()(async () => { didRun = true })
    assert.equal(didRun, true)
  })()
})

tap.test('app should forward an injected logger', async assert => {
  const logger = {}
  await app(async ({ logger }) => { logger.found = true }, { logger })
  assert.equal(logger.found, true)
})

tap.test('app should resolve and forward injected modules', async assert => {
  const modules = {
    a: async () => 'a',
    b: () => 'b',
    c: 'c'
  }

  const resolved = {}

  await app(async ({ modules }) => { resolved.modules = modules }, { modules })

  assert.equal(resolved.modules.a, 'a')
  assert.equal(resolved.modules.b, 'b')
  assert.equal(resolved.modules.c, 'c')
})
