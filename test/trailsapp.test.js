'use strict'

const smokesignals = require('../')
const assert = require('assert')

describe('TrailsApp', () => {
  it('should construct', () => {
    const app = new smokesignals.TrailsApp()
    assert(app)
  })

  it('should start', () => {
    const app = new smokesignals.TrailsApp()
    return app.start()
  })
})

