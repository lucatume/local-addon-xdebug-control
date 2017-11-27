const connect = require( 'react-redux' ).connect
const mapStateToProps = require( '../redux-maps/xdebug-control-state-to-props' )
const mapDispatchToProps = require( '../redux-maps/xdebug-control-dispatch-to-props' )

module.exports = function ( context ) {
	const XDebugControl = require( './XDebugControl' )( context )

	return connect( mapStateToProps, mapDispatchToProps )( XDebugControl )
}

