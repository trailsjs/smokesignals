/*eslint no-console: 0 */

'use strict'

const os = require('os')
const path = require('path')
const spawn = require('child_process').spawn
const spawnSync = require('child_process').spawnSync
const npm = /^win/.test(os.platform()) ? 'npm.cmd' : 'npm'

const requiredList = [
  'trailpack',
  'generator-node',
  'generator-trails',
  'generator-trailpack',
  'trailpack-core',
  'trailpack-router',
  'trailpack-repl'
]

const optionalList = [
  'trailpack-waterline',
  'trailpack-knex',
  'trailpack-footprints',
  'trailpack-hapi',
  'trailpack-express',
  'trailpack-webpack',
  'trailpack-webserver',
  'trailpack-datastore',
  'trailpack-bootstrap'
]

module.exports = {

  getTrailpackList () {
    let list
    if (process.env.REQUIRED_TESTS) {
      list = requiredList
    }
    else if (process.env.OPTIONAL_TESTS) {
      list = optionalList
    }
    else {
      console.log('REQUIRED_TESTS and OPTIONAL_TESTS not set. Running all tests.')
      list = requiredList.concat(optionalList)
    }

    return list.map(name => {
      return {
        clone_url: `https://github.com/trailsjs/${name}.git`,
        name: name
      }
    })
  },

  cloneTrailpacks (repos) {
    return Promise.all(repos.map(repo => {
      return new Promise((resolve, reject) => {
        console.log('>> git clone', repo.clone_url)
        const proc = spawn('git', [ 'clone', repo.clone_url ])

        proc.on('close', resolve)
        proc.on('error', reject)
      })
    }))
  },

  npmInstallTrailpacks (repos) {
    return Promise.all(repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)
      return new Promise((resolve, reject) => {
        console.log('>> npm install', repo.name)
        const proc = spawnSync(npm, [ 'install', '--no-progress', '-q', '--force' ], {
          cwd: wd,
          stdio: [
            'ignore',
            'ignore',
            process.stderr
          ]
        })
        resolve(proc.status)
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          console.log('>> npm link trails')
          const proc = spawnSync(npm, [ 'link', 'trails', '--force' ], {
            cwd: wd,
            stdio: [
              'ignore',
              process.stdout,
              process.stderr
            ]
          })
          resolve(proc.status)
        })
      })
    }))
  },

  checkNodeSecurity (repos) {
    return new Promise((resolve, reject) => {
      const proc = spawn(npm, [ 'install', '-g', 'nsp', '--force' ], {
        stdio: [
          'ignore',
          process.stdout,
          process.stderr
        ]
      })
      proc.on('close', resolve)
      proc.on('error', reject)
    })
    .then(() => {
      return Promise.all(repos.map(repo => {
        return new Promise((resolve, reject) => {
          const wd = path.resolve(process.cwd(), repo.name)
          console.log('>> checking security of', repo.name)
          const proc = spawn('nsp', [ 'check', '--output', 'summary' ], {
            cwd: wd,
            stdio: [
              'ignore',
              process.stdout,
              process.stderr
            ]
          })
          proc.on('close', resolve)
          proc.on('error', reject)
        })
      }))
    })
  },

  npmTestTrailpacks (repos) {
    return repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)
      const proc = spawnSync(npm, [ 'test' ], {
        cwd: wd,
        stdio: [
          'ignore',
          process.stdout,
          process.stderr
        ]
      })

      return proc.status
    })
  }
}

