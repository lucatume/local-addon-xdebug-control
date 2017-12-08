const Provider = require( 'react-redux' ).Provider
const Docker = require( './../System/Docker' )()
const Container = require( './../System/Container' )()

module.exports = function ( context, store ) {
	const React = context.React
	const XDebugControlContainer = require( './XDebugControlContainer' )( context )
	const dockerode = context.docker.docker()
	const docker = new Docker( dockerode, store )
	const maps = require( './../System/maps' )

	return function XDebugControlProvider( props ) {
		const container = function () {
			return new Container( docker, Object.assign( {status: props.siteStatus}, props.site ), maps )
		}

		return (
			<Provider store={store}>
				<XDebugControlContainer container={container}/>
			</Provider>
		)
	}
}
