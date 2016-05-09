/*eslint no-console: 0 */

'use strict'

const path = require('path')
const spawnSync = require('child_process').spawnSync

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
    return repos.map(repo => {
      console.log('>> git clone', repo.clone_url)
      const proc = spawnSync('git', [ 'clone', repo.clone_url ])
      if (proc.status > 0) {
        console.log(proc.output.toString())
      }
      // log clone errors, but do not fail
      return 0
    })
  },

  npmInstallTrailpacks (repos) {
    return repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)

      console.log('>> npm install', repo.name)
      const npmi = spawnSync('npm', [ 'install' ], { cwd: wd })

      if (npmi.status > 0) {
        console.error(npmi.output.toString())
      }

      console.log('>> npm link trails')
      const npmlink = spawnSync('npm', [ 'link', 'trails' ], { cwd: wd })

      return npmi.status + npmlink.status
    })
  },

  checkNodeSecurity (repos) {
    spawnSync('npm', [ 'install', '-g', 'nsp' ])

    return repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)

      console.log('>> checking security of', repo.name)
      const proc = spawnSync('nsp', [ 'check', '--output', 'summary' ], {
        cwd: wd,
        stdio: [
          'ignore',
          process.stderr,
          process.stderr
        ]
      })

      return proc.status
    })
  },

  npmTestTrailpacks (repos) {
    return repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)
      const proc = spawnSync('npm', [ 'test' ], {
        cwd: wd,
        stdio: [
          'ignore',
          process.stderr,
          process.stderr
        ]
      })
      return proc.status
    })
  }
}

