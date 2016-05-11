'use strict'

const smokesignals = require('../')
const TrailsApp = require('trails')

module.exports = class SmokesignalsApp extends TrailsApp {
  constructor () {
    super({
      pkg: {
        name: 'smokesignals-app'
      },
      config: {
        main: { },
        log: {
          logger: new smokesignals.Logger()
        }
      },
      api: {

      }
    })
  }
}
