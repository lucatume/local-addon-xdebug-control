module.exports = function ( context ) {

	const Component = context.React.Component
	const React = context.React
	const $ = context.jQuery
	const Container = require( './../System/Container' )( context )
	const Docker = require( './../System/Docker' )( context )
	const ActivateButton = require( './ActivateButton' )( context )
	const DeactivateButton = require( './DeactivateButton' )( context )

	return class XDebugControl extends Component {
		constructor( props ) {
			super( props )
			this.state = {
				content: null,
			}
			this.site = this.props.sites[this.props.params.siteID]
			this.docker = new Docker()
			this.container = new Container( this.docker, this.site )
		}

		componentDidMount() {
			if ( 'running' === this.props.siteStatus ) {
				this.showControls()
			} else {
				this.setState( {
					status: (
						<strong>Machine not running!</strong>
					),
				} )
			}
		}

		componentWillUnmount() {
			// tear down
		}

		showControls() {
			let xdebugStatus = ''

			try {
				xdebugStatus = this.container.getXdebugStatus()
				this.setState( {
					status: xdebugStatus,
				} )
			}
			catch ( e ) {
				this.setState( {
					status: e.message,
				} )
			}
		}

		activateXdebug() {
			this.state.loading = true
			this.container.activateXdebug()
			this.setState( {status: this.container.getXdebugStatus()} )
			this.state.loading = false
		}

		deactivateXdebug() {
			this.state.loading = true
			this.container.deactivateXdebug()
			this.setState( {status: this.container.getXdebugStatus()} )
			this.state.loading = false
		}

		render() {
			let controlOptions = {}

			if ( this.state.loading === true ) {
				controlOptions['disabled'] = 'disabled'
			}

			let button = null

			if ( this.state.status === 'inactive' ) {
				button = <ActivateButton {...controlOptions} onClick={this.activateXdebug.bind( this )}/>
			} else if ( this.state.status === 'active' ) {
				button = <DeactivateButton {...controlOptions} onClick={this.activateXdebug.bind( this )}/>
			}

			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<h4>Current XDebug status: <strong>{this.state.status}</strong></h4>
					{button}
				</div>
			)
		}
	}

}
