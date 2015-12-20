'use strict'

const Trailpack = require('trailpack')

module.exports = class KeepaliveTrailpack extends Trailpack {
  constructor (app) {
    super(app, {
      pkg: {
        name: 'trailpack-smokesignals'
      },
      config: { }
    })
  }

  /**
   * Wait for some stuff so that the process does not exit.
   */
  configure () {
    this.interval = setInterval(function(){}, Math.POSITIVE_INFINITY);
  }

  unload () {
    clearInterval(this.interval)
    return super.unload()
  }
}
