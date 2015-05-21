var assert = require('assert')
var merge = require('..')

var source = {
  name: 'John',
  surname: 'Doe'
};

Object.defineProperty(source, 'fullName', {
  get: function() {
    return this.name + ' ' + this.surname;
  }
});

describe('merge(dest, src)', function () {
  describe('arguments', function () {
    describe('dest', function () {
      it('should be required', function () {
        assert.throws(merge.bind(null, undefined), 'argument dest is required')
      })

      it('should reject null', function () {
        assert.throws(merge.bind(null, null), 'argument dest is required')
      })
    })

    describe('src', function () {
      it('should be required', function () {
        assert.throws(merge.bind(null, {}, undefined), 'argument src is required')
      })

      it('should reject null', function () {
        assert.throws(merge.bind(null, {}, null), 'argument dest is required')
      })
    })
  })

  describe('when merging objects', function () {
    it('should copy property descriptors from src to dest', function () {
      var dest = {}
      var src = {}

      Object.defineProperty(src, 'name', {
        value: 'TJ'
      })

      assert.ok(!dest.hasOwnProperty('name'))

      merge(dest, src)

      assert.ok(dest.hasOwnProperty('name'))
      assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'))
      assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'TJ')
    })

    describe('when property exists in src', function () {
      it('should redefine when configurable', function () {
        var dest = {}
        var src = {}

        Object.defineProperty(dest, 'name', {
          configurable: true,
          value: 'TJ'
        })

        Object.defineProperty(src, 'name', {
          value: 'fido'
        })

        assert.ok(dest.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'TJ')
        assert.ok(src.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'fido')

        merge(dest, src)

        assert.ok(dest.hasOwnProperty('name'))
        assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'))
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'fido')
      })

      it('should error when non-configurable', function () {
        var dest = {}
        var src = {}

        Object.defineProperty(dest, 'name', {
          configurable: false,
          value: 'TJ'
        })

        Object.defineProperty(src, 'name', {
          value: 'fido'
        })

        assert.ok(dest.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'TJ')
        assert.ok(src.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'fido')

        assert.throws(merge.bind(null, dest, src), /Cannot redefine property: name/)
      })

      it('should skip when redefine is false', function () {
        var dest = {}
        var src = {}

        Object.defineProperty(dest, 'name', {
          configurable: true,
          value: 'TJ'
        })

        Object.defineProperty(src, 'name', {
          value: 'fido'
        })

        assert.ok(dest.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'TJ')
        assert.ok(src.hasOwnProperty('name'))
        assert.equal(Object.getOwnPropertyDescriptor(src, 'name').value, 'fido')

        merge(dest, src, false)

        assert.ok(dest.hasOwnProperty('name'))
        assert.ok(Object.getOwnPropertyDescriptor(dest, 'name'))
        assert.equal(Object.getOwnPropertyDescriptor(dest, 'name').value, 'TJ')
      })
    })
  })
})
