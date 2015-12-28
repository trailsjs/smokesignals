const smokesignals = require('../')

module.exports = {
  api: {
    controllers: { },
    services: { },
    policies: { },
    models: { }
  },
  config: {
    main: {
      paths: {
        root: process.cwd()
      }
    },
    log: {
      logger: new smokesignals.Logger('error')
    },
    web: {
      port: 3000,
      host: 'localhost'
    },
    views: {

    }
  }
}
