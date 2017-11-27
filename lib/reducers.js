'use strict';

var combineReducers = require('redux').combineReducers;
var site = require('./reducers/site');
var container = require('./reducers/container');

module.exports = combineReducers({ site: site, container: container });