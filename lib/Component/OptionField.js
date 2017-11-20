'use strict';

module.exports = function (context) {
	var React = context.React;
	var Option = require('./Option')(context);

	return function OptionField(props) {
		var value = props.value || props.options[0].value;

		var options = props.options.map(function (option) {
			return React.createElement(Option, { className: 'OptionField__Option',
				value: option.value,
				key: option.value.toString(),
				label: option.label });
		});

		return React.createElement(
			'li',
			{ className: 'TableListRow OptionField' },
			React.createElement(
				'strong',
				null,
				React.createElement(
					'span',
					{ className: 'OptionField__Title' },
					props.title
				)
			),
			React.createElement(
				'div',
				null,
				React.createElement(
					'select',
					{ name: props.name, id: props.name, className: 'OptionField__Options', defaultValue: value, onChange: props.onChange },
					options
				)
			)
		);
	};
};