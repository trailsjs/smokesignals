/*eslint no-console: 0 */
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

  log (level) {
    const args = Array.prototype.slice.call(arguments)
    args.shift()
    const output = [ `smokesignal ${level}:` ].concat(args).map(obj => {
      if (obj instanceof Error) {
        obj = obj.message + '\n' + obj.stack
      }
      return obj
    })

    if (!level) level = 'debug'
    if (levelsMap[level] <= this.level) {
      const consoleLevel = console[level] || console.log
      consoleLevel.apply(console, output)
      return output.join(' ')
    }
    else {
      return null
    }
  }

  error () {
    return this.log.apply(this, [ 'error' ].concat(Array.prototype.slice.call(arguments)))
  }
  warn () {
    return this.log.apply(this, [ 'warn' ].concat(Array.prototype.slice.call(arguments)))
  }
  info () {
    return this.log.apply(this, [ 'info' ].concat(Array.prototype.slice.call(arguments)))
  }
  verbose () {
    return this.log.apply(this, [ 'verbose' ].concat(Array.prototype.slice.call(arguments)))
  }
  debug () {
    return this.log.apply(this, [ 'debug' ].concat(Array.prototype.slice.call(arguments)))
  }
  silly () {
    return this.log.apply(this, [ 'silly' ].concat(Array.prototype.slice.call(arguments)))
  }

}
