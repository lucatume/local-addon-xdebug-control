module.exports = function ( context ) {

	const React = context.React
	const Component = context.React.Component
	const Container = require( './../System/Container' )()
	const Docker = require( './../System/Docker' )()
	const Error = require( './Error' )( context )
	const Button = require( './Button' )( context )
	const XDebugFieldList = require( './XDebugFieldsList' )( context )
	const childProcess = require( 'child_process' )
	const Loading = require( './Loading' )( context )

	return class XDebugControl extends Component {
		constructor( props ) {
			super( props )

			const environment = props.environment || context.environment
			const docker = props.docker || context.docker

			this.state = {
				siteStatus: props.siteStatus || 'off',
				xdebugStatus: props.xdebugStatus || 'n/a yet...',
				error: props.error || null,
				loading: props.loading !== undefined ? props.loading : true,
			}

			this.site = props.sites[props.params.siteID]
			this.docker = props.docker || new Docker( docker.docker() )
			this.container = props.container || new Container( this.docker, this.site )
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
						const source = e.name === 'DockerError' ? 'Docker' : 'Container'
						const cta = e.message.indexOf( 'No such container' ) !== - 1 ? 'Try to restart the local machine via the Help menu' : null

						newState = {
							error: {
								'source': source,
								message: e.message,
								'cta': cta,
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

			newState.loading = false

			this.setState( newState )
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
			if ( this.state.loading === true ) {
				return (
					<Loading/>
				)
			}

			let statusString = null
			let error = null
			let button = null
			let fieldList = null
			let isCustom = this.site.environment === 'custom'
			let xdebugStatus = null
			let statusStyle = {'textTransform': 'uppercase'}
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

						const fieldListProps = {
							style: fieldListStyle,
							container: this.container,
						}

						fieldList = <XDebugFieldList {...fieldListProps}/>

					} else {
						statusString = 'Machine not running!'
					}
				}
			}

			const titleStyle = {margin: '.25em auto', 'fontSize': '125%'}
			const statusAndControlStyle = {marginBottom: '1em', display: 'flex', flexDirection: 'column'}

			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					{error}

					<div style={statusAndControlStyle}>
						<div className='XdebugStatus' style={titleStyle}>{statusString}</div>
						{button}
					</div>

					{fieldList}
				</div>
			)
		}
	}
}
