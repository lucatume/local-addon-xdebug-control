module.exports = function () {
	const DockerError = require( './../Errors/DockerError' )()

	return class Docker {
		constructor( environment, childProcess ) {
			if ( undefined === environment.dockerPath || undefined === environment.dockerEnv ) {
				throw new DockerError( 'Docker path and/or env are not set!' )
			}

			this.dockerPath = environment.dockerPath
			this.dockerEnv = environment.dockerEnv
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