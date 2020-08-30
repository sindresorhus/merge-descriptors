/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */
const merge = (dest, src, redefine) => {
  if (!dest) {
    throw new TypeError('argument dest is required');
  }

  if (!src) {
    throw new TypeError('argument src is required');
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true;
  }

  // Loop over `src` properties
  const properties = Object.getOwnPropertyNames(src);
  for (let i = 0, len = properties.length; i < len; ++i) {
    const name = properties[i];
    if (redefine || !(name in dest)) {
      // Copy property descriptor from `src` to `dest`
      Object.defineProperty(dest, name, Object.getOwnPropertyDescriptor(src, name));
    }
  }

  return dest;
};

module.exports = merge;
