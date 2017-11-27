'use strict';

var connect = require('react-redux').connect;
var mapStateToProps = require('../redux-maps/xdebug-control-state-to-props');
var mapDispatchToProps = require('../redux-maps/xdebug-control-dispatch-to-props');

module.exports = function (context) {
	var XDebugControl = require('./XDebugControl')(context);

	return connect(mapStateToProps, mapDispatchToProps)(XDebugControl);
};