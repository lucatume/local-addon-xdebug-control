const actions = require( './../reducers/actions' )

module.exports = function ( state, action ) {
	const defaultState = {
		prevOutput: [],
		prevError: '',
		hasOutput: false,
		output: [],
		hasError: false,
		error: '',
		disconnected: false,
		loading: true,
		running: true,
	}

	if ( ! action ) {
		return defaultState
	}

	switch ( action.type ) {
		case actions.docker.NOT_CONNECTED:
			return Object.assign( {}, defaultState, {disconnected: true} )
		case actions.docker.HALTED:
			return Object.assign( {}, defaultState, {disconnected: true, running: false, loading: false} )
		case actions.docker.IS_LOADING:
			return {
				prevOutput: state.output || [],
				prevError: state.error || '',
				hasOutput: false,
				output: state.output || [],
				hasError: false,
				error: state.error || '',
				loading: true,
			}
		case actions.docker.GOT_OUTPUT:
			return {
				prevOutput: state.output || [],
				prevError: state.error || '',
				hasOutput: true,
				output: action.output,
				hasError: false,
				error: '',
				loading: false,
			}
		case actions.docker.GOT_ERROR:
			return {
				prevOutput: state.output || [],
				prevError: state.error || '',
				hasOutput: false,
				output: [],
				hasError: true,
				error: action.error,
				loading: false,
			}
		default:
			return defaultState
	}
}
