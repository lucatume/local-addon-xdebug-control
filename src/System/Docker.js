module.exports = function () {
	return class Docker {
		constructor( context, childProcess ) {
			this.dockerPath = context.environment.dockerPath
			this.dockerEnv = context.environment.dockerEnv
			this.childProcess = childProcess
		}

		getDockerPath() {
			return this.dockerPath.replace( / /g, '\\ ' )
		}

		runCommand( command ) {
			let dockerPath = Docker.getDockerPath()
			let fullCommand = `${dockerPath} ${command}`

			return this.childProcess.execSync( fullCommand, {env: this.dockerEnv} ).toString().trim()
		}
	}
}