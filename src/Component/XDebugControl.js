module.exports = function ( context ) {

	const Component = context.React.Component
	const React = context.React
	const $ = context.jQuery
	const Container = require( './../System/Container' )( context )
	const Docker = require( './../System/Docker' )( context )

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
			this.setState( {content: <p>Loading...</p>} )

			let xdebugStatus = ''

			try {
				xdebugStatus = this.container.getXdebugStatus()
			}
			catch ( e ) {
				this.setState( {
					status: (
						<strong>error - {e.message}</strong>
					),
				} )

				return
			}

			this.setState( {
				status: (
					<strong>{xdebugStatus}</strong>
				),
			} )
		}

		activateXdebug() {
			this.container.activateXdebug()
			this.setState( {status: this.container.getXdebugStatus()} )
		}

		deactivateXdebug() {
			this.container.deactivateXdebug()
			this.setState( {status: this.container.getXdebugStatus()} )
		}

		render() {
			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<h4>Current XDebug status: <strong>{this.state.status}</strong></h4>
					<button onClick={this.activateXdebug.bind( this )}>Activate XDebug</button>
					<button onClick={this.deactivateXdebug.bind( this )}>Deactivate XDebug</button>
				</div>
			)
		}
	}

}
