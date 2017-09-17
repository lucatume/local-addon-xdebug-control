"use strict";

module.exports = function (context) {
	var React = context.React;

	return function ToggleField(props) {
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
					React.createElement(
						"option",
						{ value: "0", selected: props.selected == 0 },
						"no"
					),
					React.createElement(
						"option",
						{ value: "1", selected: props.selected == 1 },
						"yes"
					)
				)
			)
		);
	};
};