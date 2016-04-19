const path = require('path')
const smokesignals = require('..')

module.exports = {
  api: {
    controllers: { },
    services: { },
    policies: { },
    models: { }
  },
  config: {
    i18n: {
      lng: 'en',
      resources: {en: {}}
    },
    main: {
      paths: {
        root: process.cwd(),
        temp: path.resolve(process.cwd(), '.tmp')
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
