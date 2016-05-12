'use strict'

const Trailpack = require('trailpack')

module.exports = class SmokesignalsTrailpack extends Trailpack {
  constructor(app, config, name) {
    super(app, {
      pkg: {
        name: name || 'trailpack-smokesignals'
      },
      config: config || { }
    })
  }

  /**
   * Wait for some stuff so that the process does not exit.
   */
  configure() {
    this.timeout = setTimeout(function () { }, Math.POSITIVE_INFINITY)
  }

  unload() {
    clearTimeout(this.timeout)
  }
}
