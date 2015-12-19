/*eslint no-console: 0 */
'use strict'

/**
 * Logging levels
 * @see {@link https://github.com/winstonjs/winston#logging-levels}
 */
const levelsMap = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
}

/**
 * Support the more popular winston logging levels. This is not meant to be a
 * replacement for winston, it is a lightweight stand-in for unit testing to
 * avoid having to install and configure winston.
 *
 * @see {@link https://github.com/winstonjs/winston#using-logging-levels}
 */
module.exports = class Logger {
  constructor (defaultLevel) {
    this.level = levelsMap[defaultLevel]
  }

  log (level, msg) {
    const output = [ 'smokesignal logger: [', level, ']', msg ].join(' ')
    if (!level) level = 'debug'
    if (levelsMap[level] <= this.level) {
      console.log(output)
      return output
    }
    else {
      return null
    }
  }

  error (msg) {
    return this.log('error', msg)
  }
  warn (msg) {
    return this.log('warn', msg)
  }
  info (msg) {
    return this.log('info', msg)
  }
  verbose (msg) {
    return this.log('verbose', msg)
  }
  debug (msg) {
    return this.log('debug', msg)
  }
  silly (msg) {
    return this.log('silly', msg)
  }

}
