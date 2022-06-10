const tap = require('tap')
const app = require('../lib')
const EventListener = require('events')

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

tap.test('app should forward options to unhandled', async assert => {
  let handled
  let exited = false

  const done = {}
  done.promise = new Promise(resolve => {
    done.halt = () => resolve()
  })

  const events = new EventListener()
  const handle = {
    exit: true,
    handler: ({ event }) => {
      handled = event
      done.halt()
    },
    context: {
      events,
      exit: () => {
        exited = true
      }
    }
  }

  await app({ handle })(async () => {
    console.info("In app")
    events.emit('SIGINT')
    await done.promise
  })

  assert.equal(handled, 'SIGINT')
  assert.true(exited)
})
