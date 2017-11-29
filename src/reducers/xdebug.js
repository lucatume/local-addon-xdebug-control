module.exports = function ( state, action ) {
	const defaultState = {
		status: undefined,
	}
	const stateXdebug = state && state.xdebug ? state.xdebug : {}
	const actionXdebug = action && action.xdebug ? action.xdebug : {}

	return Object.assign( defaultState, stateXdebug, actionXdebug )
}