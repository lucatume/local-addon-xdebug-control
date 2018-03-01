# run-when-changed

[![GratiPay](https://img.shields.io/gratipay/user/alexgorbatchev.svg)](https://gratipay.com/alexgorbatchev/)
![Downloads](https://img.shields.io/npm/dm/run-when-changed.svg)
![Version](https://img.shields.io/npm/v/run-when-changed.svg)

Selectively executes commands when watched files are changed.

## Installation

```
npm install --save-dev run-when-changed
```

## Usage

```
Usage: run-when-changed --watch <glob> --match [glob] --exec <cmd> (--watch <glob> --match [glob] --exec <cmd>)

Selectively executes commands when watched files are changed.

Options:

  -h, --help          output usage information
  -w, --watch <glob>  A glob to watch, starts a new group
  -e, --exec <cmd>    Command to execute, eg "echo %s"
  -m, --match [glob]  Only files that match will be executed
  --verbose           Verbose mode
```

## CMD format

Command line accepts the following tokens:

* `%filedir` - Changed file directory, relative to CWD.
* `%filename` - Changed file name and extension.
* `%filepath` - Changed file directory, file name and extension relative to CWD.
* `%s` - Same as `%filepath`.
* `%package-json-dir` - Full path to nearest folder that contains `package.json`.
* `%full-filedir` - Full absolute changed file directory.
* `%full-filepath` - Full absolute changed file directory, file name and extension.

## Examples

### Watching one or more glob

```
$ run-when-changed --watch "**/*.js" --exec "ls -la %s"
$ run-when-changed --watch "**/*.js" --watch "README.md" --exec "ls -la %s"
```

### Executing multiple commands

Having more than one `exec` passed per `watch` will execute multiple commands per file when there's a change event.

```
$ run-when-changed --watch "**/*.js" --exec "ls -la %s" --exec "chmod +x %s"
```

### Watching multiple globs 

You can `watch` multiple globs and execute commands specific to each glob. 

```
$ run-when-changed \
  --watch "**/*.js" --exec "ls -la %s" \  # executes `ls` for `*.js` files
  --watch "**/*.txt" --exec "rm %s" \     # executes `rm` for `*.txt` files
```

### Filtering

```
# executes `ls` for `*-test.js` files
$ run-when-changed --watch "**/*.js" --filter "*-test.js" --exec "ls -la %s"
```

### Running mocha

This command will execute `mocha` test runner for all `tests/**/*-test.js` files.

```
$ run-when-changed \
  --watch "tests/**/*-test.js" \
  --exec "mocha --require babel-register %s" \
  --verbose
```

## NPM Package Usage Examples

Install locally (`npm install --save-dev run-when-changed`) then add the following to your `package.json`

### Mocha

You can use `npm run dev` command to start a file watcher that will execute the test file you are working on without having to add `.only`.

```js
{
  "scripts": {
    "dev": "run-when-changed --watch 'tests/**/*-test.js' --exec 'mocha --require babel-register %s'"
  }
}
```

## Mocha & Babel

You can use `npm run dev` command to start a file watcher that will execute the test file you are working on without having to add `.only` and compile `*.js` files in the root folder using Babel.js.

```js
{
  "scripts": {
    "dev": "run-when-changed.js --watch 'tests/**/*-test.js' --exec 'mocha --require babel-register %s' --watch '*.js' --exec 'babel %s --out-dir ./lib --source-maps'"
  }
}
```

## Notes

1. `filter` and `exec` applies only to immediately preceeding `watch`
1. You can have as many `filter` and `exec` after one or many `watch`

## License

ISC
