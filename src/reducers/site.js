const Actions = require( './../reducers/actions' )

module.exports = function ( state, action ) {
	const defaultState = {
		prevOutput: [],
		prevError: '',
		hasOutput: false,
		output: [],
		hasError: false,
		error: '',
		loading: true,
	}

	if ( ! action ) {
		return defaultState
	}

	switch ( action.type ) {
		case Actions.docker.IS_LOADING:
			return {
				prevOutput: state.output || [],
				prevError: state.error || '',
				hasOutput: false,
				output: state.output || [],
				hasError: false,
				error: state.error || '',
				loading: true,
			}
		case Actions.docker.GOT_OUTPUT:
			return {
				prevOutput: state.output || [],
				prevError: state.error || '',
				hasOutput: true,
				output: action.output,
				hasError: false,
				error: '',
				loading: false,
			}
		case Actions.docker.GOT_ERROR:
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
