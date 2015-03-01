/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}
