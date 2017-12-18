const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const FieldList = require( './FieldList' )( context )
	const XDebug = require( './../Data/XDebug' )
	const CommonFields = require( './../Data/CommonFields' )

	return function XDebugFieldsList( props ) {
		const propTypes = {
			status: PropTypes.shape( {
				remote_enable: PropTypes.string,
				remote_port: PropTypes.string,
				remote_autostart: PropTypes.string,
				remote_connect_back: PropTypes.string,
				scream: PropTypes.string,
				show_local_vars: PropTypes.string,
			} ),
			applyWith: PropTypes.func.isRequired,
		}

		assertPropTypes( propTypes, props )

		const toggleOptions = CommonFields.toggleOptions()
		const status = props.status
		const fieldListProps = {
			fields: [
				{
					title: 'remote_enable',
					name: 'remote_enable',
					value: status['remote_enable'],
					options: toggleOptions,
					default: '0',
				},
				{
					title: 'remote_port',
					name: 'remote_port',
					value: status['remote_port'],
					options: XDebug.remotePortOptions(),
					default: '9000',
				},
				{
					title: 'remote_autostart',
					name: 'remote_autostart',
					value: status['remote_autostart'],
					options: toggleOptions,
					default: '0',
				},
				{
					title: 'remote_connect_back',
					name: 'remote_connect_back',
					value: status['remote_connect_back'],
					options: toggleOptions,
					default: '0',
				},
				{
					title: 'scream',
					name: 'scream',
					value: status['scream'],
					options: toggleOptions,
					default: '0',
				},
				{
					title: 'show_local_vars',
					name: 'show_local_vars',
					value: status['show_local_vars'],
					options: toggleOptions,
					default: '0',
				},
			],
			applyWith: props.applyWith,
		}

		return (
			<FieldList {...fieldListProps}/>
		)
	}
}