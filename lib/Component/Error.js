'use strict';

module.exports = function (context) {

	var React = context.React;

	return function Error(props) {
		var source = props.source || 'Unknown';
		var message = props.message || 'no message provided';
		var red = '#FF0000';
		var color = props.color || red;
		var headerStyle = {
			'text-align': 'center',
			'margin-bottom': '1em',
			'font-size': '120%'
		};
		var errorStyle = {
			border: '2px solid ' + color,
			padding: '.25em',
			color: color
		};
		var footerStyle = {
			'text-align': 'center',
			'margin-top': '1em',
			'font-size': '120%'
		};

		return React.createElement(
			'section',
			{ className: 'Error', style: errorStyle },
			React.createElement(
				'p',
				{ className: 'Error__Message' },
				React.createElement(
					'div',
					{ style: headerStyle },
					'Error generated in ',
					React.createElement(
						'span',
						{ className: 'Error__Message__Source' },
						source
					)
				),
				React.createElement(
					'div',
					{ className: 'Error__Message__Text' },
					message
				),
				React.createElement(
					'div',
					{ style: footerStyle },
					'If you just booted Local up try to go back to SITE SETUP and get back to this...'
				)
			)
		);
	};
};