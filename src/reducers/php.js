module.exports = function ( state, action ) {
	const defaultState = {
		version: undefined,
		bin: undefined,
	}
	const statePhp = state && state.php ? state.php : {}
	const actionPhp = action && action.php ? action.php : {}

	return Object.assign( defaultState, statePhp, actionPhp )
}
