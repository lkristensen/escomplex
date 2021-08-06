'use strict'
const parsers = [
  {
    name: 'acorn',
    options: {
      locations: true,
      onComment: []
    },
    parser: require('acorn')
  },
  {
    name: 'espree',
    options: {
      ecmaVersion: 8,
      loc: true
    },
    parser: require('espree')
  },
  {
    name: 'espree',
    options: {
      ecmaVersion: 9,
      loc: true
    },
    parser: require('espree')
  },
  {
    name: 'esprima',
    options: {
      loc: true
    },
    parser: require('esprima')
  }
]
module.exports.forEach = function forEachParser (tests) {
  for (let i = 0; i < parsers.length; i++) {
    const parserName = parsers[i].name
    const parser = parsers[i].parser
    const options = parsers[i].options
    suite('using the ' + parserName + ' parser:', function () {
      tests(parserName, parser, options)
    })
  }
}
