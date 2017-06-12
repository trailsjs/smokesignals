# smokesignals

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]
[![Follow @trailsjs on Twitter][twitter-image]][twitter-url]

:fire: Utilities for testing [Trails](http://trailsjs.io) Applications and Trailpacks

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

#### `smokesignals.FailsafeConfig`

A configuration object that can be merged into a barebones "test" config so that
it can pass validation by trailpack-core.

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/smokesignals/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

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
[twitter-image]: https://img.shields.io/twitter/follow/trailsjs.svg?style=social
[twitter-url]: https://twitter.com/trailsjs
