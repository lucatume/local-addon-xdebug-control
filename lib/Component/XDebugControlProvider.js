'use strict';

var Provider = require('react-redux').Provider;
var Docker = require('./../System/Docker')();
var Container = require('./../System/Container')();

module.exports = function (context, store) {
	var React = context.React;
	var XDebugControlContainer = require('./XDebugControlContainer')(context);
	var dockerode = context.docker.docker();
	var docker = new Docker(dockerode, store);
	var maps = require('./../System/maps');

	return function XDebugControlProvider(props) {
		var container = new Container(docker, Object.assign({ status: props.siteStatus }, props.site), maps);

		return React.createElement(
			Provider,
			{ store: store },
			React.createElement(XDebugControlContainer, { container: container })
		);
	};
};