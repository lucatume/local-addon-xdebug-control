'use strict'

var path = require('path')
var fs = require('fs')

var Promise = require('es6-promise').Promise

function find (fileOrDir, toFind, dir) {
  var pieces = dir.split(path.sep)

  return new Promise(function (resolve, reject) {
    tryStat(pieces)

    function tryStat (dirPieces) {
      if (!dirPieces.length) {
        return resolve(null)
      }

      var check = dirPieces.concat(toFind).join(path.sep)

      fs.stat(check, interpretResult)

      function interpretResult (err, stats) {
        if (err || !stats[fileOrDir === 'dir' ? 'isDirectory' : 'isFile']()) {
          return tryStat(dirPieces.slice(0, -1))
        }

        resolve(check)
      }
    }
  })
}

find.dir = find.bind(null, 'dir')
find.file = find.bind(null, 'file')

module.exports = find
