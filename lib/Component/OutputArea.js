'use strict';

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function (_ref) {
		var children = _ref.children,
		    centerX = _ref.centerX,
		    centerY = _ref.centerY;

		var style = { height: '100%', display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%' };

		if (centerX !== false) {
			style.alignContent = 'center';
		}

		if (centerY !== false) {
			style.alignItems = 'center';
		}

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
					{ style: { marginTop: '1em', marginBottom: '1em' }, key: child.type.name + '-' + i++ },
					child
				);
			})
		);
	};
};