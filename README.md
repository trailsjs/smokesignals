# smokesignals

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

:fire: Utilities for testing Trails Applications and Trailpacks

## Install
```sh
$ npm install smokesignals
```

## API

```js
const smokesignals = require('smokesignals')
```

#### `smokesignals.Logger`

A mock logger that can be used for testing so that you don't have to `require()`
and configure `winston`.

#### `smokesignals.Trailpack`

A mock trailpack that will keep the event loop from dying so that integration
tests can be run on other trailpacks.

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/smokesignals/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/smokesignals.svg?style=flat-square
[npm-url]: https://npmjs.org/package/smokesignals
[ci-image]: https://img.shields.io/travis/trailsjs/smokesignals/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/smokesignals
[daviddm-image]: http://img.shields.io/david/trailsjs/smokesignals.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/smokesignals
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/smokesignals.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/smokesignals
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

