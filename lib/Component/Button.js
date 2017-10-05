'use strict';

module.exports = function (context) {
	var React = context.React;

	return function Button(props) {
		var buttonStyle = props.style || {};

		if (props.centered) {
			buttonStyle['display'] = 'block';

			if (buttonStyle['marginTop'] || buttonStyle['marginBottom'] || buttonStyle['marginLeft'] || buttonStyle['marginRight']) {
				buttonStyle['marginTop'] = buttonStyle['marginTop'] || '0';
				buttonStyle['marginBottom'] = buttonStyle['marginBottom'] || '0';
				buttonStyle['marginLeft'] = buttonStyle['marginLeft'] || 'auto';
				buttonStyle['marginRight'] = buttonStyle['marginRight'] || 'auto';
			} else if (!buttonStyle['margin']) {
				buttonStyle['margin'] = '0 auto';
			}
		}

		var button = React.createElement(
			'button',
			{ className: '--GrayOutline --Small Button', onClick: props.onClick, style: buttonStyle },
			props.text
		);

		return button;
	};
};