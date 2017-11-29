"use strict";

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var message = _ref.message;

		return React.createElement(
			"h3",
			null,
			message
		);
	};
};