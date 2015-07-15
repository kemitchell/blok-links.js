var isArray = require('is-array')
var isObject = require('is-object')

function has(array, value) {
  return array.indexOf(value) > -1 }

function links(list, isHash, argument) {
  if (isObject(argument)) {
    return Object.keys(argument)
      .reduce(
        function(list, key) {
          return links(list, isHash, argument[key]) },
        list) }
  else if (isArray(argument)) {
    return argument
      .reduce(
        function(list, element) {
          return links([], isHash, element)
            .reduce(
              function(list, element) {
                return (
                  has(list, element) ?
                    list : list.concat(element) ) },
              list) },
        list) }
  else if (typeof argument === 'string') {
    return (
      ( isHash(argument) && !has(list, argument) ) ?
      list.concat(argument) : list ) }
  return [] } 

function blokLinks(isHash, argument) {
  return links([], isHash, argument).sort() }

module.exports = blokLinks
