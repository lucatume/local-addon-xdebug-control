"use strict";

module.exports = function (context) {
	var React = context.React;

	return function DisplayField(props) {
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
				{ id: props.name },
				props.value
			)
		);
	};
};