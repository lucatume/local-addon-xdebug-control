'use strict';

var PropTypes = require('prop-types');
var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;
	var FieldList = require('./FieldList')(context);
	var XDebug = require('./../Data/XDebug');
	var CommonFields = require('./../Data/CommonFields');

	return function XDebugFieldsList(props) {
		var propTypes = {
			status: PropTypes.shape({
				remote_enable: PropTypes.string,
				remote_port: PropTypes.string,
				remote_autostart: PropTypes.string,
				remote_connect_back: PropTypes.string,
				scream: PropTypes.string,
				show_local_vars: PropTypes.string
			}),
			applyWith: PropTypes.func.isRequired
		};

		assertPropTypes(propTypes, props);

		var toggleOptions = CommonFields.toggleOptions();
		var status = props.status;
		var fieldListProps = {
			fields: [{
				title: 'remote_enable',
				name: 'remote_enable',
				value: status['remote_enable'],
				options: toggleOptions,
				default: '0'
			}, {
				title: 'remote_port',
				name: 'remote_port',
				value: status['remote_port'],
				options: XDebug.remotePortOptions(),
				default: '9000'
			}, {
				title: 'remote_autostart',
				name: 'remote_autostart',
				value: status['remote_autostart'],
				options: toggleOptions,
				default: '0'
			}, {
				title: 'remote_connect_back',
				name: 'remote_connect_back',
				value: status['remote_connect_back'],
				options: toggleOptions,
				default: '0'
			}, {
				title: 'scream',
				name: 'scream',
				value: status['scream'],
				options: toggleOptions,
				default: '0'
			}, {
				title: 'show_local_vars',
				name: 'show_local_vars',
				value: status['show_local_vars'],
				options: toggleOptions,
				default: '0'
			}],
			applyWith: props.applyWith
		};

		return React.createElement(FieldList, fieldListProps);
	};
};