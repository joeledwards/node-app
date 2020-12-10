const tap = require('tap')
const { resolveModules } = require('../lib/modules')

tap.test('resolve multiple suppliers', async assert => {
  assert.same(await resolveModules(), {}) 
  assert.same(await resolveModules(null), {}) 
  assert.same(await resolveModules({}), {}) 

  assert.same(await resolveModules({ a: 1 }), { a: 1 }) 
  assert.same(await resolveModules({ a: () => 1 }), { a: 1 }) 
  assert.same(await resolveModules({ a: async () => 1 }), { a: 1 }) 

  assert.same(await resolveModules({ a: 1, b: 2 }), { a: 1, b: 2 }) 
  assert.same(await resolveModules({ a: 1, b: () => 2 }), { a: 1, b: 2 }) 
  assert.same(await resolveModules({ a: () => 1, b: () => 2 }), { a: 1, b: 2 }) 
  assert.same(await resolveModules({ a: async () => 1, b: () => 2 }), { a: 1, b: 2 }) 
  assert.same(await resolveModules({ a: async () => 1, b: async () => 2 }), { a: 1, b: 2 }) 
})
