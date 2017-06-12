const assert = require('assert')
const smokesignals = require('../')

describe('Logger', () => {
  it('should instantiate', () => {
    const log = new smokesignals.Logger()
    assert(log)
  })
  it('should log error when level=error', () => {
    const log = new smokesignals.Logger('error')
    const output = log.error('testerror')
    assert.equal(output, 'smokesignal logger: [ error ] testerror')
  })
  it('should log verbose when level=silly', () => {
    const log = new smokesignals.Logger('silly')
    const output = log.verbose('testverbose')
    assert.equal(output, 'smokesignal logger: [ verbose ] testverbose')
  })
  it('should not log warn when level=error', () => {
    const log = new smokesignals.Logger('error')
    const output = log.warn('testwarn')
    assert.equal(output, null)
  })
})

