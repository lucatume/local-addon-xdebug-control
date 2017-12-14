const Provider = require( 'react-redux' ).Provider
const Docker = require( './../System/Docker' )()
const Container = require( './../System/Container' )()
const actions = require( './../reducers/actions' )

module.exports = function ( context, store ) {
	const React = context.React
	const XDebugControlContainer = require( './XDebugControlContainer' )( context )
	const maps = require( './../System/maps' )

	return function XDebugControlProvider( props ) {
		const container = function () {
			const docker = new Docker( props.siteModel.container, store )
			return new Container( docker, Object.assign( {status: props.siteStatus}, props.site ), maps )
		}

		if ( ! props.siteStatus || props.siteStatus === 'halted' ) {
			store.dispatch( {type: actions.docker.HALTED} )
		}

		return (
			<Provider store={store}>
				<XDebugControlContainer container={container}/>
			</Provider>
		)
	}
}
