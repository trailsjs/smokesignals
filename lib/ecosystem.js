/*eslint no-console: 0 */

'use strict'

const path = require('path')
const spawn = require('child_process').spawn
const spawnSync = require('child_process').spawnSync
const request = require('request')

const ignoreList = [
  'trailpack-sails',
  'trailpack-bookshelf',
  'trailpack-sequelize',
  'trailpack-swagger'
]

const Ecosystem = module.exports = {

  getTrailpackList (page, allRepos) {
    const options = {
      url: 'https://api.github.com/orgs/trailsjs/repos?page=' + page,
      headers: {
        'User-Agent': 'smokesignals'
      }
    }
    return new Promise((resolve, reject) => {
      request(options, (err, resp, body) => {
        if (err || resp.statusCode != 200) {
          return reject(err)
        }
        const repos = JSON.parse(body)
        if (repos.length === 0) {
          return resolve(
            allRepos
              .filter(repo => /^trailpack-/.test(repo.name))
              .filter(repo => ignoreList.indexOf(repo.name) === -1)
            )
        }
        else {
          return resolve(Ecosystem.getTrailpackList(page + 1, allRepos.concat(repos)))
        }
      })
    })
  },

  cloneTrailpacks (repos) {
    return repos.map(repo => {
      console.log('>> git clone', repo.clone_url)
      const proc = spawnSync('git', [ 'clone', repo.clone_url ])
      if (proc.status > 0) {
        console.log(proc.output.toString())
      }
    })
  },

  npmInstallTrailpacks (repos) {
    return repos.map(repo => {
      console.log('>> npm install', repo.name)
      const wd = path.resolve(process.cwd(), repo.name)
      const proc = spawnSync('npm', [ 'install' ], { cwd: wd })
      return proc.status
    })
  },

  npmLinkTrails (repos) {
    return repos.map(repo => {
      const wd = path.resolve(process.cwd(), repo.name)
      return new Promise(resolve => {

        const proc = spawn('npm', [ 'link', '../trails' ], { cwd: wd })
        proc.on('close', resolve)
      })
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

