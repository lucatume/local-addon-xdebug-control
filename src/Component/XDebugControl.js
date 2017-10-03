module.exports = function ( context ) {

	const React = context.React
	const Component = context.React.Component
	const Container = require( './../System/Container' )()
	const Docker = require( './../System/Docker' )()
	const Error = require( './Error' )( context )
	const Button = require( './Button' )( context )
	const FieldList = require( './FieldsList' )( context )
	const childProcess = require( 'child_process' )


	return class XDebugControl extends Component {
		constructor( props ) {
			if ( undefined === props.environment ) {
				props.environment = context.environment
			}

			super( props )

			this.state = {
				siteStatus: 'off',
				xdebugStatus: 'n/a yet...',
				error: null,
			}

			this.site = props.sites[props.params.siteID]
			this.docker = props.docker || new Docker( props.environment, childProcess )
			this.container = props.container || new Container( this.docker, this.site )
		}

		componentWillMount() {
		}

		componentDidMount() {
		}

		componentWillReceiveProps( nextProps ) {
			let newState = null

			if ( nextProps.siteStatus === 'running' ) {
				try {
					newState = {
						siteStatus: 'running',
						xdebugStatus: this.container.getXdebugStatus(),
						error: null,
					}
				}
				catch ( e ) {
					if ( e.name === 'DockerError' || e.name === 'ContainerError' ) {
						newState = {
							error: {
								source: e.name === 'DockerError' ? 'Docker' : 'Container',
								message: e.message,
							},
						}
					} else {
						throw e
					}
				}
			} else {
				newState = {
					siteStatus: 'stopped',
					xdebugStatus: 'n/a',
					error: null,
				}
			}

			this.setState( newState )
		}

		componentWillUnmount() {
			// tear down
		}

		activateXdebug() {
			this.container.activateXdebug()
			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
		}

		deactivateXdebug() {
			this.container.deactivateXdebug()
			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
		}

		render() {
			let statusString = null
			let error = null
			let button = null
			let fieldList = null
			let isCustom = this.site.environment === 'custom'
			let xdebugStatus = null
			let statusStyle = {'text-transform': 'uppercase'}
			let isRunning = this.props.siteStatus === 'running'

			if ( this.state.error !== null ) {
				error = (
					<Error {...this.state.error}/>
				)
			} else {
				if ( ! isCustom ) {
					statusString = 'Only available for custom installations!'
				} else {
					xdebugStatus = this.state.xdebugStatus

					const green = '#1FC37D'
					const red = '#FF0000'

					if ( xdebugStatus === 'active' ) {
						statusStyle['color'] = green
					} else {
						statusStyle['color'] = red
					}

					if ( isRunning ) {
						statusString = (
							<span style={statusStyle}>XDebug is {xdebugStatus}</span>
						)

						if ( xdebugStatus === 'inactive' ) {
							button = <Button text="Activate XDebug" onClick={this.activateXdebug.bind( this )}/>
						} else if ( xdebugStatus === 'active' ) {
							button = <Button text="Deactivate XDebug" onClick={this.deactivateXdebug.bind( this )}/>
						}

						let fieldListStyle = {
							'margin-top': '1em',
						}

						fieldList = <FieldList style={fieldListStyle} container={this.container} disabled={this.state.loading === false}/>

					} else {
						statusString = 'Machine not running!'
					}
				}
			}

			const titleStyle = {margin: '.25em auto', 'fontSize': '125%'}

			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<span className='XdebugStatus' style={titleStyle}>{statusString}</span>
					{error}
					{button}
					{fieldList}
				</div>
			)
		}
	}
}
