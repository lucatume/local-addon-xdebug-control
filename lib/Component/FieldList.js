"use strict";

module.exports = function (context) {
	var React = context.React;

	return function FieldList(props) {
		return React.createElement(
			"fieldset",
			null,
			React.createElement("input", { type: "text", value: props })
		);
	};
};