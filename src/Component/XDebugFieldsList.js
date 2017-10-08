module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const FieldList = require( './FieldList' )( context )
	const XDebugFields = require( './../Data/XDebugFields' )()
	const CommonFields = require( './../Data/CommonFields' )()

	return class XDebugFieldsList extends Component {
		constructor( props ) {
			super( props )
			this.container = props.container
			this.style = props.style
		}

		render() {
			const toggleOptions = CommonFields.toggleOptions()
			const fieldListProps = {
				fields: [
					{title: 'remote_enable', name: 'remote_enable', options: toggleOptions, default: '0'},
					{title: 'remote_host', name: 'remote_host', options: XDebugFields.remoteHostOptions(), default: '192.168.94.1'},
					{title: 'remote_port', name: 'remote_port', options: XDebugFields.remotePortOptions(), default: '9000'},
					{title: 'remote_autostart', name: 'remote_autostart', options: toggleOptions, default: '0'},
					{title: 'remote_connect_back', name: 'remote_connect_back', options: toggleOptions, default: '0'},
					{title: 'scream', name: 'scream', options: toggleOptions, default: '0'},
					{title: 'show_local_vars', name: 'show_local_vars', options: toggleOptions, default: '0'},
				],
				writeWith: this.container.setXdebugSetting.bind( this.container ),
				afterWrite: this.container.restartPhpService.bind( this.container ),
				readWith: this.container.readXdebugSetting.bind( this.container ),
			}

			return (
				<FieldList {...fieldListProps}/>
			)
		}
	}
}