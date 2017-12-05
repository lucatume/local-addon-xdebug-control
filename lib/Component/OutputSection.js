'use strict';

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var children = _ref.children;

		var style = { display: 'flex', flexDirection: 'column', flex: 1 };
		var i = 0;

		if (!Array.isArray(children)) {
			children = [children];
		}

		return React.createElement(
			'div',
			{ style: style },
			children.map(function (child) {
				return React.createElement(
					'div',
					{ style: { marginBottom: '.5em', textAlign: 'center' }, key: child.type.name + '-' + i++ },
					child
				);
			})
		);
	};
};