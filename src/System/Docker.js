module.exports = function ( context ) {
	const childProcess = require( 'child_process' )

	return class Docker {
		static getDockerPath() {
			return context.environment.dockerPath.replace( / /g, '\\ ' )
		}

		static runCommand( command ) {
			let dockerPath = Docker.getDockerPath()
			let fullCommand = `${dockerPath} ${command}`

			return childProcess.execSync( fullCommand, {env: context.environment.dockerEnv} ).toString()
		}
	}
}