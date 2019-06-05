# merge-descriptors

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Merge source object "own" properties onto a destination object, including 
non-enumerable "own" properties, and preserve each property's values and 
descriptors. This means the destination object has a true copy of the source 
object's properties, including their values and configuration.  In particular this 
also copies over properties that are defined using a getter or a getter-setter 
pair.

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

### merge(destination, source, overwrite)

Merge "own" properties from `source` object onto `destination` object. 
The `overwrite` argument is optional and has default value `true`. If 
`overwrite == true` then existing properties on `destination` will be overwritten. 
If `overwrite == false`, existing properties on `destination` will not be 
overwritten. Returns the destination object.

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
