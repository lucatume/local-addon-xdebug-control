module.exports = function () {
	return class DockerError extends Error {
		constructor( ...args ) {
			super( ...args )
			this.name = 'DockerError'
		}
	}
}