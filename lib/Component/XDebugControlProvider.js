'use strict';

var Provider = require('react-redux').Provider;
var Docker = require('./../System/Docker')();
var Container = require('./../System/Container')();

module.exports = function (context, store) {
	var React = context.React;
	var XDebugControlContainer = require('./XDebugControlContainer')(context);
	var dockerode = context.docker.docker();
	var docker = new Docker(dockerode, store);

	return function XDebugControlProvider(props) {
		var container = new Container(docker, props.site.container);

		return React.createElement(
			Provider,
			{ store: store },
			React.createElement(XDebugControlContainer, { machine: container })
		);
	};
};