var isArray = require('is-array')
var isObject = require('is-object')

function has(array, value) {
  return array.indexOf(value) > -1 }

function links(list, isReference, argument) {
  if (isObject(argument)) {
    return Object.keys(argument)
      .reduce(
        function(list, key) {
          return links(list, isReference, argument[key]) },
        list) }
  else if (isArray(argument)) {
    return argument
      .reduce(
        function(list, element) {
          return links([], isReference, element)
            .reduce(
              function(list, element) {
                return (
                  has(list, element) ?
                    list : list.concat(element) ) },
              list) },
        list) }
  else if (typeof argument === 'string') {
    return (
      ( isReference(argument) && !has(list, argument) ) ?
      list.concat(argument) : list ) }
  return [] } 

function blokLinks(isReference, argument) {
  return links([], isReference, argument).sort() }

module.exports = blokLinks
