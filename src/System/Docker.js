module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()

	return class Docker {
		constructor( context, childProcess ) {
			if ( ! context.environment || ! context.environment.dockerPath || ! context.environment.dockerEnv ) {
				throw new DockerError( 'Docker path and/or env are not set!' )
			}

			this.dockerPath = context.environment.dockerPath
			this.dockerEnv = context.environment.dockerEnv
			this.childProcess = childProcess
		}

		getDockerPath() {
			return this.dockerPath.replace( / /g, '\\ ' )
		}

		runCommand( command ) {
			if ( command.length === 0 ) {
				throw new DockerError( 'runCommand method should not be invoked with empty command' )
			}

			let dockerPath = this.getDockerPath()
			let fullCommand = `${dockerPath} ${command}`

			try {
				return this.childProcess.execSync( fullCommand, {env: this.dockerEnv} ).toString().trim()
			}
			catch ( e ) {
				throw new DockerError( e.message )
			}
		}
	}
}