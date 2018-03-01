var path = require('path')

var test = require('tape')

var find = require('../')

var deepPath = path.join(__dirname, '1level', '2level', '3level')

test('can find dir', function (t) {
  t.plan(1)

  find.dir('.findlevel', deepPath)
    .then(function (found) {
      t.strictEqual(found, path.join(__dirname, '1level', '.findlevel'))
    })
    .catch(t.fail)
})

test('knows type', function (t) {
  t.plan(1)

  find.file('.findlevel', deepPath)
    .then(function (found) {
      t.equal(found, null)
    })
    .catch(t.fail)
})

test('can find file', function (t) {
  t.plan(1)

  find('file', 'index.js', deepPath)
    .then(function (found) {
      t.strictEqual(found, path.join(__dirname, 'index.js'))
    })
    .catch(t.fail)
})

test('searches up more than once', function (t) {
  t.plan(1)

  find.file('package.json', deepPath)
    .then(function (found) {
      t.strictEqual(found, path.resolve(__dirname, '..', 'package.json'))
    })
    .catch(t.fail)
})

test('finds the nearest to current dir', function (t) {
  t.plan(1)

  find('dir', 'multi-level', deepPath)
    .then(function (found) {
      t.strictEqual(
        found,
        path.join(__dirname, '1level', '2level', 'multi-level')
      )
    })
    .catch(t.fail)
})

test('returns null if not found', function (t) {
  t.plan(1)

  find('file', '--------', deepPath)
    .then(function (found) {
      t.equal(found, null)
    })
    .catch(t.fail)
})
