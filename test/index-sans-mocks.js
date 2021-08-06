'use strict'
const assert = require('chai').assert
const escomplex = require('../src')
const parsers = require('./helpers/parsers')
suite('index parser overrides', function () {
  parsers.forEach(function (parserName, parser, options) {
    test('AST callback for module does not alter behavior', function () {
      let wasCalled = false
      const expected = escomplex.analyse('var a;', {})
      const actual = escomplex.analyse('var a;', {}, function (source) {
        wasCalled = true
        return parser.parse(source, options)
      })
      assert.ok(wasCalled)
      assert.deepEqual(expected, actual)
    })
    test('overriding parser fn does not alter behavior for project', function () {
      const sources = [
        {
          path: 'one',
          code: 'var a;'
        },
        {
          path: 'two',
          code: 'var b;'
        }
      ]
      let callCount = 0
      const expected = escomplex.analyse(sources, {})
      const actual = escomplex.analyse(sources, {}, function (source) {
        assert.ok(source)
        callCount++
        return parser.parse(source, options)
      })
      assert.equal(callCount, sources.length)
      assert.deepEqual(expected, actual)
    })
    test('overriding parser options does not alter behavior', function () {
      const sources = [
        {
          path: 'one',
          code: 'var a;'
        },
        {
          path: 'two',
          code: 'var b;'
        }
      ]
      const expected = escomplex.analyse(sources, {})
      const actual = escomplex.analyse(sources, {}, {
        loc: false,
        range: true
      })
      assert.deepEqual(expected, actual)
    })
  })
})
