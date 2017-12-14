const actions = require( './../reducers/actions' )
const outputToArray = require( './../Utils/Output' ).toArray

module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()
	const containerExec = require( 'dockerode-utils' ).containerExec

	return class Docker {
		constructor( container, store ) {
			this.container = container
			this.store = store
		}

		runCommand( command, containerUuid, callback ) {
			if ( command.length === 0 ) {
				throw new DockerError( 'runCommand method should not be invoked with empty command' )
			}

			const fullCommand = ['sh', '-c', command]
			const that = this

			this.store.dispatch( {type: actions.docker.IS_LOADING} )

			containerExec( this.container, fullCommand ).then( function ( message ) {
				const output = message.length > 0 ? outputToArray( message ) : []
				let action = {type: actions.docker.GOT_OUTPUT, output: output}

				if ( callback ) {
					action = callback( action, output )
				}

				that.store.dispatch( action )
			}, function ( reason ) {
				that.store.dispatch( {type: actions.docker.GOT_ERROR, error: JSON.stringify( reason )} )
			} )
		}
	}
}