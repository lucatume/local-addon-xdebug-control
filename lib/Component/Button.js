'use strict';

module.exports = function (context) {
	var React = context.React;

	return function Button(props) {
		var buttonStyle = {};

		if (props.centered) {
			buttonStyle['display'] = 'block';
			buttonStyle['margin'] = '0 auto';
		}

		var button = React.createElement(
			'button',
			{ className: '--GrayOutline --Small', onClick: props.onClick, style: buttonStyle },
			props.text
		);

		return button;
	};
};