const combineReducers = require( 'redux' ).combineReducers
const site = require('./reducers/site')
const container = require( './reducers/container' )

module.exports = combineReducers( {site, container} )
