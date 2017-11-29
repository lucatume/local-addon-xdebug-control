"use strict";

module.exports = function (state, action) {
	var defaultState = {
		status: undefined
	};
	var stateXdebug = state && state.xdebug ? state.xdebug : {};
	var actionXdebug = action && action.xdebug ? action.xdebug : {};

	return Object.assign(defaultState, stateXdebug, actionXdebug);
};