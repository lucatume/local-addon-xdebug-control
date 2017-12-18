'use strict';

var colors = require('./../UI/colors');
var PropTypes = require('prop-types');
var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var text = _ref.text,
		    status = _ref.status;

		var propTypes = {
			text: PropTypes.string.isRequired,
			status: PropTypes.string
		};

		assertPropTypes(propTypes, { text: text, status: status });

		var statusStyle = { textTransform: 'uppercase', fontSize: '125%' };
		statusStyle.color = status === 'active' ? colors.green() : colors.red();
		return React.createElement(
			'span',
			{ style: statusStyle },
			text
		);
	};
};