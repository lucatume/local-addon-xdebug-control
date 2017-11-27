const Provider = require( 'react-redux' ).Provider
const Docker = require( './../System/Docker' )()
const Container = require( './../System/Container' )()

module.exports = function ( context, store ) {
	const React = context.React
	const XDebugControlContainer = require( './XDebugControlContainer' )( context )
	const dockerode = context.docker.docker()
	const docker = new Docker( dockerode, store )

	return function XDebugControlProvider( props ) {
		const container = new Container( docker, props.site.container )

		return (
			<Provider store={store}>
				<XDebugControlContainer machine={container}/>
			</Provider>
		)
	}
}
