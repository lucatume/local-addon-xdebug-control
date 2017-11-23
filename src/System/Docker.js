module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()
	const containerExec = require( 'dockerode-utils' ).containerExec

	return class Docker {
		constructor( dockerode ) {
			this.dockerode = dockerode
		}

		runCommand( command, containerUuid ) {
			if ( command.length === 0 ) {
				throw new DockerError( 'runCommand method should not be invoked with empty command' )
			}

			const container = this.dockerode.getContainer( containerUuid )

			// @todo store this Redux state
			const fullCommand = ['sh', '-c', command]
			return containerExec( container, fullCommand ).then( function ( message ) {
				console.log( message )
			} )
		}
	}
}