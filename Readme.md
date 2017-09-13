## Quick Start
 1. Clone this repo: `git clone git@github.com:JRGould/simple-pressmatic-addon.git my-pressmatic-addon && cd my-pressmatic-addon`
 1. Run `npm install`
 1. Run initial build: `npm run-script build`
 1. Link into Local's `addon` directory: `ln -s "$(pwd)" ~/Library/Application Support/Local by Flywheel/addons`
 1. Restart Local and activate addon from Settings > Addons

## Developing

 - To automatically transpile your JS while developing, just start watch task: `npm run-script watch`.
 - The only thing this starter addon currently does is open dev tools in Local and add a `reload()` function to the window object, type `reload()` into the dev tools console after you've saved/transpiled to see your changes.


### Installing Dev Dependencies
`npm install`

### Folder Structure
All files in `/src` will be transpiled to `/lib` using [Babel](https://github.com/babel/babel/). Anything in `/lib` will be overwritten.

### Transpiling
`npm run-script build` or `npm run-script watch` to transpile when source files are saved

### Babel, transpiling, ES6, Node.js, what?
Not familiar with some or any of these terms? Here are a few resources to get you up to speed.

- Node.js
  - [The Art of Node](https://github.com/maxogden/art-of-node#the-art-of-node)
- Babel
  - [Babel Introduction](https://github.com/thejameskyle/babel-handbook/blob/master/translations/en/user-handbook.md#toc-introduction)
  - [Source-to-source compiler (Wikipedia)](https://en.wikipedia.org/wiki/Source-to-source_compiler)
- ES6/ES2015
  - [Learn ES2015](https://babeljs.io/docs/learn-es2015/)
  - [JavaScript — Just another introduction to ES6](https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f#.a11ayxe2p)

## Dev Dependencies

- [babel](https://github.com/babel/babel/tree/master/packages): Turn ES6 code into readable vanilla ES5 with source maps
- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages): Babel preset for all es2015 plugins.
- [babel-preset-react](https://github.com/babel/babel/tree/master/packages): Babel preset for all React plugins.
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages): Babel preset for stage 0 plugins


## License

MIT
