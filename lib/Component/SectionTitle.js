'use strict';

var PropTypes = require('prop-types');
var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var text = _ref.text;

		var propTypes = {
			text: PropTypes.string.isRequired
		};

		assertPropTypes(propTypes, { text: text });

		return React.createElement(
			'h4',
			{ style: { textAlign: 'center' } },
			text
		);
	};
};