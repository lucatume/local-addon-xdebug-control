#!/usr/bin/env node

const commander = require('commander');
const runWhenChanged = require('../lib').default;
const watches = [];

function add(key, value) {
  var node = watches[watches.length - 1];

  if (node && key === 'watch') {
    const keys = Object.keys(node).join(' ');
    if (keys !== 'watch') {
      node = null;
    }
  }

  if (!node) {
    node = {};
    watches.push(node);
  }

  if (!node[key]) {
    node[key] = [];
  }

  node[key].push(value);
}

commander
  .usage('--watch <glob> --match [glob] --exec <cmd> (--watch <glob> --match [glob] --exec <cmd>)')
  .description('Selectively executes commands when watched files are changed.')
  .option('-w, --watch <glob>', 'A glob to watch, starts a new group', val => add('watch', val))
  .option('-e, --exec <cmd>', 'Command to execute, eg "echo %s"', val => add('exec', val))
  .option('-m, --match [glob]', 'Only files that match will be executed', val => add('match', val))
  .option('--verbose', 'Verbose mode')
  .parse(process.argv)

runWhenChanged(watches, {
  verbose: commander.verbose
});
