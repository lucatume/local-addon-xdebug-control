'use strict';

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var text = _ref.text,
		    status = _ref.status;

		var green = '#1FC37D';
		var red = '#FF0000';

		var statusStyle = { textTransform: 'uppercase', fontSize: '200%', fontWeight: 'bold' };
		statusStyle.color = status === 'active' ? green : red;
		return React.createElement(
			'span',
			{ style: statusStyle },
			text
		);
	};
};