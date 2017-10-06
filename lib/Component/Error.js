'use strict';

module.exports = function (context) {

	var React = context.React;

	return function Error(props) {
		var source = props.source || 'Unknown';
		var message = props.message || 'no message provided';
		var openIssueLink = 'https://github.com/lucatume/local-addon-xdebug-control/issues/new';
		var cta = props.cta || React.createElement(
			'section',
			null,
			React.createElement(
				'p',
				null,
				'Try to quit and restart Local. Yes: turning it off and on again ',
				React.createElement(
					'em',
					null,
					'might'
				),
				' help.'
			),
			React.createElement(
				'p',
				null,
				'If the issue persists please open an issue ',
				React.createElement(
					'a',
					{ href: openIssueLink },
					'on the addon repository'
				),
				' containing the message above, how you got here, what you were trying to do and your setup.'
			)
		);
		var red = '#FF0000';
		var color = props.color || red;
		var headerStyle = {
			'textAlign': 'center',
			'marginBottom': '1em',
			'fontSize': '120%'
		};
		var errorStyle = {
			border: '2px solid ' + color,
			padding: '.25em',
			color: color
		};
		var footerStyle = {
			'textAlign': 'center',
			'marginTop': '1em',
			'fontSize': '120%'
		};

		return React.createElement(
			'section',
			{ className: 'Error', style: errorStyle },
			React.createElement(
				'div',
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
					{ style: footerStyle, className: 'Error__Message__CTA' },
					cta
				)
			)
		);
	};
};