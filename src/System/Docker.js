const Actions = require( './../reducers/actions' )

module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()
	const containerExec = require( 'dockerode-utils' ).containerExec

	return class Docker {
		constructor( dockerode, store ) {
			this.dockerode = dockerode
			this.store = store
		}

		runCommand( command, containerUuid, updatingObject = undefined, updatingKey = undefined ) {
			if ( command.length === 0 ) {
				throw new DockerError( 'runCommand method should not be invoked with empty command' )
			}

			const container = this.dockerode.getContainer( containerUuid )

			const fullCommand = ['sh', '-c', command]
			const that = this

			this.store.dispatch( {type: Actions.docker.IS_LOADING} )

			containerExec( container, fullCommand ).then( function ( message ) {
				// return just the last output line
				const output = message.length > 0 ? message.pop().replace( /[\x00-\x1F\x7F-\x9F]/g, '' ).trim() : ''
				const action = {type: Actions.docker.GOT_OUTPUT, output: output}

				if ( updatingObject && updatingKey ) {
					action[updatingObject] = {}
					action[updatingObject][updatingKey] = output
				}

				that.store.dispatch( action )
			}, function ( reason ) {
				that.store.dispatch( {type: Actions.docker.GOT_ERROR, error: JSON.stringify( reason )} )
			} )
		}
	}
}