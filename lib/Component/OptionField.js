'use strict';

var PropTypes = require('prop-types');
var assertPropTypes = require('check-prop-types').assertPropTypes;

module.exports = function (context) {
	var React = context.React;
	var Option = require('./Option')(context);

	return function OptionField(props) {
		var propTypes = {
			value: PropTypes.any,
			default: PropTypes.any,
			options: PropTypes.arrayOf(PropTypes.shape({
				value: PropTypes.any.isRequired,
				label: PropTypes.string.isRequired
			})),
			title: PropTypes.string.isRequired
		};

		assertPropTypes(propTypes, props);

		var value = props.value || props.default || props.options[0].value;

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
				{ style: { display: 'flex' } },
				React.createElement(
					'select',
					{ name: props.name, id: props.name, className: 'OptionField__Options', defaultValue: value },
					options
				)
			)
		);
	};
};