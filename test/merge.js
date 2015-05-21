/*!
 * merge-descriptors
 * Copyright(c) 2015 Mike Grabowski
 * MIT Licensed
 */

var should = require('should');
var merge = require('../index');

var source = {
  name: 'John',
  surname: 'Doe'
};

Object.defineProperty(source, 'fullName', {
  get: function() {
    return this.name + ' ' + this.surname;
  }
});

describe('merge()', function() {

  it('should throw an error if dest is falsy', function() {
    should.throws(function() {
      merge();
    }, TypeError);
  });

  it('should throw an error if source is falsy', function() {
    should.throws(function() {
      merge(null);
    }, TypeError);
  });

  it('should merge property descriptors from source to dest', function() {
    var dest = {
      name: 'Mike'
    };
    merge(dest, source);
    should.equal(dest.fullName, 'John Doe');
  });

  it('should not redefine property descriptors in dest when redefine is false', function() {
    var dest = {
      name: 'Mike'
    };
    merge(dest, source, false);
    should.exist(dest.fullName);
    should.equal(dest.fullName, 'Mike Doe');
  });

});