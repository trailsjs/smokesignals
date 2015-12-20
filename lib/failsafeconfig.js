const smokesignals = require('../')

module.exports = {
  api: {
    controllers: { },
    services: { },
    policies: { },
    models: { }
  },
  config: {
    main: { },
    log: {
      logger: new smokesignals.Logger('error')
    }
  }
}
