'use strict'

const Trailpack = require('trailpack')

module.exports = class SmokesignalsTrailpack extends Trailpack {
  constructor(app, config) {
    super(app, {
      pkg: {
        name: 'trailpack-smokesignals'
      },
      config: config || { }
    })
  }

  /**
   * Wait for some stuff so that the process does not exit.
   */
  configure() {
    this.interval = setInterval(function () { }, Math.POSITIVE_INFINITY)
  }

  unload() {
    clearInterval(this.interval)
  }
}
