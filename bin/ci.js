#!/usr/bin/env node

/*eslint no-console: 0 */
const ecosys = require('../').Ecosystem
const repos = ecosys.getTrailpackList()

let exitCode = 0
let timer = new Date()

console.log('>> 1. cloning', repos.length, 'repositories from github')

ecosys.cloneTrailpacks(repos)
  .then(clones => {
    console.log('clone statuses', clones)
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log('>> 2. installing', repos.length, 'trailpack repositories from npm')

    //exitCode += clones.reduce((sum, proc) => sum + proc, 0)

    timer = new Date()
    return ecosys.npmInstallTrailpacks(repos)
  })
  .then(packs => {
    console.log('install statuses', packs)
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log('>> 3. running nsp (nodesecurity.io) checks')

    //exitCode += packs.reduce((sum, proc) => sum + proc, 0)

    timer = new Date()
    return ecosys.checkNodeSecurity(repos)
  })
  .then(security => {
    console.log('security statuses', security)
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log('>> 4. running tests on', repos.length, 'trailpacks')

    //exitCode += security.reduce((sum, proc) => sum + proc, 0)

    timer = new Date()
    return ecosys.npmTestTrailpacks(repos)
  })
  .then(tests => {
    console.log('test statuses', tests)
    exitCode += tests.reduce((sum, proc) => sum + proc, 0)
    console.log('>> complete. time elapsed', (new Date() - timer), 'ms')
    console.log()
    console.log('Summary')

    repos.forEach((repo, i) => {
      console.log(repo.name, '::', (tests[i] ? 'FAIL' : 'PASS'))
    })

    console.log('exit code:', exitCode)
    process.exit(exitCode)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
