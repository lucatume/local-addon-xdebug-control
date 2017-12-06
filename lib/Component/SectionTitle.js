'use strict';

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var text = _ref.text;

		return React.createElement(
			'h4',
			{ style: { textAlign: 'center' } },
			text
		);
	};
};