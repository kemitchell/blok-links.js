var links = require('./')

function isFakeDigest(argument) {
  return /^\$\d$/.test(argument) }

require('tape')(function(t) {
  t.same(
    links(isFakeDigest, {}),
    [],
    'empty object')

  t.same(
    links(isFakeDigest, { a: '$1' }),
    [ '$1' ],
    'single link')

  t.same(
    links(isFakeDigest, { a: '$1', b: '$1' }),
    [ '$1' ],
    'returns unique array')

  t.same(
    links(isFakeDigest, { a: [ 'a', '$9' ], b: '$1' }),
    [ '$1', '$9' ],
    'deep digest')

  t.end() })
