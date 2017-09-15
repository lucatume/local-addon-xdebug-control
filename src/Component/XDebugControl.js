module.exports = function ( context ) {

	const Component = context.React.Component
	const React = context.React
	const Container = require( './../System/Container' )( context )
	const Docker = require( './../System/Docker' )( context )
	const Button = require( './Button' )( context )
	const FieldList = require( './FieldsList' )( context )

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
			if ( this.props.siteStatus === 'running' ) {
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
			let button = null
			let statusStyle = {}

			if ( this.state.status === 'inactive' ) {
				button = <Button
					text="Activate XDebug"
					disabled={this.state.loading === false}
					onClick={this.activateXdebug.bind( this )}
				/>
				statusStyle['color'] = '#FF0000'
			} else if ( this.state.status === 'active' ) {
				button = <Button
					text="Deactivate XDebug"
					disabled={this.state.loading === false}
					onClick={this.deactivateXdebug.bind( this )}
				/>
				statusStyle['color'] = '#1FC37D'
			}

			let statusString = (
				<strong><span style={statusStyle}>{this.state.status}</span></strong>
			)

			let fieldListStyle = {
				'margin-top': '1em',
			}

			let fieldList = null
			if ( this.props.siteStatus === 'running' ) {
				fieldList = <FieldList style={fieldListStyle} container={this.container} disabled={this.state.loading === false}/>
			}

			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<h4>Current XDebug status: {statusString}</h4>
					{button}
					{fieldList}
				</div>
			)
		}
	}

}
