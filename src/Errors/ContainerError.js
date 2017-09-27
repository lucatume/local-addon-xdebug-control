module.exports = function () {
	return class ContainerError extends Error {
		constructor( ...args ) {
			super( ...args )
			this.name = 'ContainerError'
		}
	}
}