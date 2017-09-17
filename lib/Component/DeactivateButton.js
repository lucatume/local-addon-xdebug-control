"use strict";

module.exports = function (context) {
	var React = context.React;

	return function DeactivateButton(props) {
		return React.createElement(
			"button",
			{ className: "--GrayOutline --Small", onClick: props.onClick },
			"Deactivate XDebug"
		);
	};
};