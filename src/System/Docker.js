const Actions = require( './../reducers/actions' )

module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()
	const containerExec = require( 'dockerode-utils' ).containerExec

	return class Docker {
		constructor( dockerode, store ) {
			this.dockerode = dockerode
			this.store = store
		}

		runCommand( command, containerUuid, updatingProp = undefined ) {
			if ( command.length === 0 ) {
				throw new DockerError( 'runCommand method should not be invoked with empty command' )
			}

			const container = this.dockerode.getContainer( containerUuid )

			const fullCommand = ['sh', '-c', command]
			const that = this

			containerExec( container, fullCommand ).then( function ( message ) {
				const action = {type: Actions.docker.GOT_OUTPUT, output: message[0]}

				if ( updatingProp !== undefined ) {
					action[updatingProp] = action.output

				}
				that.store.dispatch( action )
			}, function ( reason ) {
				that.store.dispatch( {type: Actions.docker.GOT_ERROR, error: JSON.stringify( reason )} )
			} )
		}

		getStore() {
			return this.store
		}
	}
}