#!/usr/bin/env node

/*eslint no-console: 0 */
'use strict'

const ecosys = require('../').Ecosystem
const repos = ecosys.getTrailpackList()

let exitCode = 0
let timer = new Date()

console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
console.log('>> 1. cloning', repos.length, 'repositories from github')

ecosys.cloneTrailpacks(repos)
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
    //console.log('>> npm link exit codes', exitCodes)
    console.log('>> 4. running nsp (nodesecurity.io) checks')

    exitCode += exitCodes.reduce((sum, code) => sum + code, 0)

    timer = new Date()
    return ecosys.checkNodeSecurity(repos)
   })
  .then(exitCodes => {
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
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

    console.log('exit code:', exitCode)
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
