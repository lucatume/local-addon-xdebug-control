"use strict";

module.exports = function (context) {
	var React = context.React;

	return function ActivateButton(props) {
		return React.createElement(
			"button",
			{ className: "--GrayOutline --Small", onClick: props.onClick },
			"Activate XDebug"
		);
	};
};