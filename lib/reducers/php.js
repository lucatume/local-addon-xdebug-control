"use strict";

module.exports = function (state, action) {
	var defaultState = {
		version: undefined,
		bin: undefined
	};
	var statePhp = state && state.php ? state.php : {};
	var actionPhp = action && action.php ? action.php : {};

	return Object.assign(defaultState, statePhp, actionPhp);
};