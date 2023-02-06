# merge-descriptors

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Merge objects using descriptors.

```js
var thing = {
  get name() {
    return 'jon'
  }
}

var animal = {

}

merge(animal, thing)

animal.name === 'jon'
```
## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).


Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install merge-descriptors
```

## API

### merge(destination, source)

Redefines `destination`'s descriptors with `source`'s. The return value is the
`destination` object.

### merge(destination, source, false)

Defines `source`'s descriptors on `destination` if `destination` does not have
a descriptor by the same name. The return value is the `destination` object.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/merge-descriptors.svg
[npm-url]: https://npmjs.org/package/merge-descriptors
[travis-image]: https://img.shields.io/travis/component/merge-descriptors/master.svg
[travis-url]: https://travis-ci.org/component/merge-descriptors
[coveralls-image]: https://img.shields.io/coveralls/component/merge-descriptors/master.svg
[coveralls-url]: https://coveralls.io/r/component/merge-descriptors?branch=master
[downloads-image]: https://img.shields.io/npm/dm/merge-descriptors.svg
[downloads-url]: https://npmjs.org/package/merge-descriptors
