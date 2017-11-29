const combineReducers = require( 'redux' ).combineReducers
const site = require( './reducers/site' )
const xdebug = require( './reducers/xdebug' )
const php = require('./reducers/php')

module.exports = combineReducers( {site, xdebug} )
