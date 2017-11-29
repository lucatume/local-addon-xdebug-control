'use strict';

var combineReducers = require('redux').combineReducers;
var site = require('./reducers/site');
var xdebug = require('./reducers/xdebug');
var php = require('./reducers/php');

module.exports = combineReducers({ site: site, xdebug: xdebug });