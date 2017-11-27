const Actions = require( './../reducers/actions' )

module.exports = function ( state, action ) {
	const defaultState = {
		prevOutput: '',
		prevError: '',
		hasOutput: false,
		output: '',
		hasError: false,
		error: '',
		loading: true,
		xdebugStatus: undefined,
	}

	if ( ! action ) {
		return defaultState
	}

	switch ( action.type ) {
		case Actions.docker.IS_LOADING:
			return {
				prevOutput: state.output || '',
				prevError: state.error || '',
				hasOutput: false,
				output: state.output || '',
				hasError: false,
				error: state.error || '',
				loading: true,
				// keep the previous XDebug status
				xdebugStatus: state.xdebugStatus || undefined,
			}
		case Actions.docker.GOT_OUTPUT:
			return {
				prevOutput: state.output || '',
				prevError: state.error || '',
				hasOutput: true,
				output: action.output,
				hasError: false,
				error: '',
				loading: false,
				// either update XDebug status from the action or keep the current one
				xdebugStatus: action.xdebugStatus || state.xdebugStatus,
			}
		case Actions.docker.GOT_ERROR:
			return {
				prevOutput: state.output || '',
				prevError: state.error || '',
				hasOutput: false,
				output: '',
				hasError: true,
				error: action.error,
				loading: false,
				// either update XDebug status from the action or keep the current one
				xdebugStatus: action.xdebugStatus || state.xdebugStatus,
			}
		default:
			return defaultState
	}
}
