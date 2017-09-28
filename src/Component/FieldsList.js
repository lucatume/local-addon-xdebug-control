module.exports = function ( context ) {
	const React = context.React
	const $ = context.jQuery
	const Component = context.React.Component
	const OptionField = require( './OptionField' )( context )
	const Button = require( './Button' )( context )

	return class FieldsList extends Component {
		constructor( props ) {
			super( props )
			this.container = props.container
			this.state = {
				remote_enable: '0',
				remote_host: 'localhost',
				remote_port: '9000',
				remote_autostart: '0',
				remote_connect_back: '0',
				scream: '0',
				show_local_vars: '0',
			}
		}

		readSettings() {
			return {
				remote_enable: this.container.readXdebugSetting( 'remote_enable', '0' ),
				remote_host: this.container.readXdebugSetting( 'remote_host', '192.168.94.1' ),
				remote_port: this.container.readXdebugSetting( 'remote_port', '9000' ),
				remote_autostart: this.container.readXdebugSetting( 'remote_autostart', '0' ),
				remote_connect_back: this.container.readXdebugSetting( 'remote_connect_back', '0' ),
				scream: this.container.readXdebugSetting( 'scream', '0' ),
				show_local_vars: this.container.readXdebugSetting( 'show_local_vars', '0' ),
			}
		}

		parseSettings() {
			let parsed = []

			$( `#${this.props.id} input,select` ).each( function () {
				let $this = $( this )
				parsed.push( {name: $this.attr( 'name' ), value: $this.val()} )
			} )

			return parsed
		}

		updateXdebugSettings() {
			// read the settings from the field list
			let settings = this.parseSettings()

			settings.map( function ( setting ) {
				this.container.setXdebugSetting( setting.name, setting.value )
			}, this )

			this.setState( this.readSettings() )

			this.container.restartPhpService()
		}

		componentWillReceiveProps() {
			this.setState( this.readSettings() )
		}

		render() {
			let remoteHostOptions = [
				{value: '192.168.94.1', label: '192.168.94.1 (Mac)'},
                {value: '192.168.56.1', label: '192.168.56.1 (Windows, preferred)'},
                {value: '192.168.95.1', label: '192.168.95.1 (Windows, fallback)'},
				{value: '10.0.2.2', label: '10.0.2.2'},
				{value: 'localhost', label: 'localhost'},

			]
			let remotePortOptions = [
				{value: '9000', label: '9000'},
				{value: '9001', label: '9001'},
				{value: '9002', label: '9002'},
				{value: '9003', label: '9003'},
				{value: '9004', label: '9004'},
				{value: '9005', label: '9005'},
			]
			let toggleOptions = [
				{value: '0', label: 'no'},
				{value: '1', label: 'yes'},
			]

			return (
				<ul className="TableList Form" id={this.props.id} style={this.props.style}>
					<OptionField title="remote_enable" name="remote_enable" value={this.state.remote_enable} options={toggleOptions}/>
					<OptionField title="remote_host" name="remote_host" value={this.state.remote_host} options={remoteHostOptions}/>
					<OptionField title="remote_port" name="remote_port" value={this.state.remote_port} options={remotePortOptions}/>
					<OptionField title="remote_autostart" name="remote_autostart" value={this.state.remote_autostart} options={toggleOptions}/>
					<OptionField title="remote_connect_back" name="remote_connect_back" value={this.state.remote_connect_back}
					             options={toggleOptions}/>
					<OptionField title="scream" name="scream" value={this.state.scream} options={toggleOptions}/>
					<OptionField title="show_local_vars" name="show_local_vars" value={this.state.show_local_vars} options={toggleOptions}/>
					<Button text="Apply Settings" onClick={this.updateXdebugSettings.bind( this )} centered/>
				</ul>
			)
		}
	}
}