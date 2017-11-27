'use strict';

module.exports = function (context) {
	var React = context.React;
	var Component = context.React.Component;

	return function Loading(props) {
		return React.createElement(
			'div',
			{ className: 'BigLoader', style: { display: 'flex', flexDirection: 'column', height: '100%' } },
			React.createElement(
				'div',
				{ className: 'LoadingIndicator LoadingIndicator--Big' },
				React.createElement('div', { className: 'LoadingIndicator_Bounce1' }),
				React.createElement('div', { className: 'LoadingIndicator_Bounce2' }),
				React.createElement('div', { className: 'LoadingIndicator_Bounce3' })
			)
		);
	};
};