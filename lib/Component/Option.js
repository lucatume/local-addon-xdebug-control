"use strict";

module.exports = function (context) {
	var React = context.React;

	return function Option(props) {
		return React.createElement(
			"option",
			{ value: props.value, key: props.value.toString() },
			props.label
		);
	};
};