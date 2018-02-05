# fs-find-root

[![Build Status](https://img.shields.io/travis/jarofghosts/fs-find-root.svg?style=flat-square)](https://travis-ci.org/jarofghosts/fs-find-root)
[![npm install](https://img.shields.io/npm/dm/fs-find-root.svg?style=flat-square)](https://www.npmjs.org/package/fs-find-root)
[![npm version](https://img.shields.io/npm/v/fs-find-root.svg?style=flat-square)](https://www.npmjs.org/package/fs-find-root)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![License](https://img.shields.io/npm/l/fs-find-root.svg?style=flat-square)](https://github.com/jarofghosts/fs-find-root/blob/master/LICENSE)

search up directories until you find what you're looking for

## usage

`var find = require('fs-find-root')`

* `find('dir', name, startingDirectory)` searches for directory
  `name` starting from `startDirectory` and returns a promise.
* `find.dir(name, startingDirectory)` is equivalent to the above.
* `find('file', name, startingDirectory)` searches for file `name`
  starting from `startDirectory` and returns a promise.
* `find.file(name, startingDirectory)` is equivalent to the above.

## example

```js
var find = require('fs-find-root')

// find a directory!
find.dir('.git', process.cwd())
  .then(function (found) {
    console.log('found the root of your git repo @ ' + found)
  })

// find a file!
find.file('package.json', process.cwd())
  .then(function (found) {
    console.log('found yer package.json right here: ' + found)
  })
```

## notes

* resolves with `null` if the file or directory is not found.

## license

MIT
