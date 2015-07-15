var isArray = require('is-array')
var isObject = require('is-object')

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
                if (list.indexOf(element) < 0) {
                  return list.concat(element) }
                else {
                  return list } },
              list) },
        list) }
  else if (typeof argument === 'string') {
    if (isHash(argument) && list.indexOf(argument) < 0) {
      return list.concat(argument) }
    else {
      return list } }
  return [] } 

function blokLinks(isHash, argument) {
  return links([], isHash, argument).sort() }

module.exports = blokLinks
