#!/usr/bin/env node

/*eslint no-console: 0 */
'use strict'

let repos = [ ]
let exitCode = 0
let timer = new Date()
const ecosys = require('../').Ecosystem

console.log('>> 1. fetching trailpack repository list from Github API...')

ecosys.getTrailpackList(1, [ ])
  .then(_repos => {
    repos = _repos
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log('>> 2. cloning', repos.length, 'trailpack repositories from github')

    timer = new Date()
    return ecosys.cloneTrailpacks(repos)
  })
  .then(exitCodes => {
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    //console.log('>> git clone exit codes', exitCodes)
    console.log('>> 3. installing', repos.length, 'trailpack repositories from npm')

    exitCode = exitCodes.reduce((sum, code) => sum + code, 0)

    timer = new Date()
    return ecosys.npmInstallTrailpacks(repos)
  })
  .then(exitCodes => {
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    //console.log('>> npm install exit codes', exitCodes)
    console.log('>> 4. linking the local trails build into dependencies...')

    exitCode += exitCodes.reduce((sum, code) => sum + code, 0)

    timer = new Date()
    return Promise.all(ecosys.npmLinkTrails(repos))
  })
  .then(exitCodes => {
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    //console.log('>> npm link exit codes', exitCodes)
    console.log('>> 5. running tests on', repos.length, 'trailpacks')

    exitCode += exitCodes.reduce((sum, code) => sum + code, 0)

    timer = new Date()
    return ecosys.npmTestTrailpacks(repos)
   })
  .then(exitCodes => {
    exitCode += exitCodes.reduce((sum, code) => sum + code, 0)
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log()
    console.log('Summary')

    repos.forEach((repo, i) => {
      console.log(repo.name, '::', (exitCodes[i] ? 'FAIL' : 'PASS'))
    })

    process.exit(exitCode)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
