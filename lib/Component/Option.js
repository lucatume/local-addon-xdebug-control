'use strict';

var PropTypes = require('prop-types');
var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = function (context) {
	var React = context.React;

	return function Option(props) {
		var propTypes = {
			value: PropTypes.any.isRequired,
			label: PropTypes.string.isRequired
		};

		assertPropTypes(propTypes, props);

		return React.createElement(
			'option',
			{ value: props.value, key: props.value.toString() },
			props.label
		);
	};
};