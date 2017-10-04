"use strict";

module.exports = function (context) {
	var React = context.React;

	return function OptionField(props) {
		var options = props.options.map(function (option) {
			return React.createElement(
				"option",
				{ value: option.value, selected: option.value == props.value, key: option.value.toString() },
				option.label
			);
		});

		return React.createElement(
			"li",
			{ className: "TableListRow" },
			React.createElement(
				"strong",
				null,
				props.title
			),
			React.createElement(
				"div",
				null,
				React.createElement(
					"select",
					{ name: props.name, id: props.name },
					options
				)
			)
		);
	};
};