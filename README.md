# merge-descriptors

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Merge source object properties onto a destination object, and preserve descriptors.  Descriptors are configuration data associated to each property such as whether the property is `writable`, `enumerable`, and/or `configurable`.  This data will be preserved in the destination object.

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

## API

### merge(Object destination, Object source [, bool overwrite])

Merge properties from `source` object into `destination` object, preserving each property's descriptors.  If `overwrite == false` then existing properties on `destination` will not be overwritten.  The default value of `overwrite` is true.  Returns the destination object.

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
