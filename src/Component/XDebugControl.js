module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const Container = require( './../System/Container' )()
	const Error = require( './Error' )( context )
	const Button = require( './Button' )( context )
	const XDebugFieldList = require( './XDebugFieldsList' )( context )
	const Loading = require( './Loading' )( context )

	return class XDebugControl extends Component {
		//		constructor( props ) {
		//			super( props )
		//
		//			if ( props.loading ) {
		//				return
		//			}
		//
		//			this.site = props.site
		//			this.container = new Container( props.docker, props.site.container )
		//
		//			this.state = {
		//				loading: props.container.loading,
		//				error: props.container.hasError ? props.container.error : false,
		//				xdebugStatus: props.container.xdebugStatus,
		//				siteStatus: props.site.status,
		//			}
		//		}

		//		componentDidMount() {
		//			if ( this.state.xdebugStatus === undefined ) {
		//				this.container.getXdebugStatus()
		//			}
		//		}

		//		componentWillReceiveProps( nextProps ) {
		//			let newState = null
		//
		//			if ( nextProps.siteStatus === 'running' ) {
		//				try {
		//					newState = {
		//						siteStatus: 'running',
		//						xdebugStatus: this.container.getXdebugStatus(),
		//						error: null,
		//					}
		//				}
		//				catch ( e ) {
		//					if ( e.name === 'DockerError' || e.name === 'ContainerError' ) {
		//						const source = e.name === 'DockerError' ? 'Docker' : 'Container'
		//						const cta = e.message.indexOf( 'No such docker' ) !== - 1 ? 'Try to restart the local machine via the Help menu' : null
		//
		//						newState = {
		//							error: {
		//								'source': source,
		//								message: e.message,
		//								'cta': cta,
		//							},
		//						}
		//					} else {
		//						throw e
		//					}
		//				}
		//			} else {
		//				newState = {
		//					siteStatus: 'stopped',
		//					xdebugStatus: 'n/a',
		//					error: null,
		//				}
		//			}
		//
		//			newState.loading = false
		//
		//			this.setState( newState )
		//		}

		//		activateXdebug() {
		//			this.container.activateXdebug()
		//			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
		//		}
		//
		//		deactivateXdebug() {
		//			this.container.deactivateXdebug()
		//			this.setState( {xdebugStatus: this.container.getXdebugStatus()} )
		//		}

		render() {
			if ( this.props.container.loading === true ) {
				return (
					<Loading/>
				)
			}

			//			let statusString = null
			//			let error = null
			//			let button = null
			//			let fieldList = null
			//			let isCustom = this.site.environment === 'custom'
			//			let xdebugStatus = null
			//			let statusStyle = {'textTransform': 'uppercase'}
			//			let isRunning = this.props.siteStatus === 'running'
			//
			//			if ( this.state.error !== null ) {
			//				error = (
			//					<Error {...this.state.error}/>
			//				)
			//			} else {
			//				if ( ! isCustom ) {
			//					statusString = 'Only available for custom installations!'
			//				} else {
			//					xdebugStatus = this.state.xdebugStatus
			//
			//					const green = '#1FC37D'
			//					const red = '#FF0000'
			//
			//					if ( xdebugStatus === 'active' ) {
			//						statusStyle['color'] = green
			//					} else {
			//						statusStyle['color'] = red
			//					}
			//
			//					if ( isRunning ) {
			//						statusString = (
			//							<span style={statusStyle}>XDebug is {xdebugStatus}</span>
			//						)
			//
			//						if ( xdebugStatus === 'inactive' ) {
			//							button = <Button text="Activate XDebug" onClick={this.activateXdebug.bind( this )}/>
			//						} else if ( xdebugStatus === 'active' ) {
			//							button = <Button text="Deactivate XDebug" onClick={this.deactivateXdebug.bind( this )}/>
			//						}
			//
			//						let fieldListStyle = {
			//							'margin-top': '1em',
			//						}
			//
			//						const fieldListProps = {
			//							style: fieldListStyle,
			//							container: this.container,
			//						}
			//
			//						fieldList = <XDebugFieldList {...fieldListProps}/>
			//
			//					} else {
			//						statusString = 'Machine not running!'
			//					}
			//				}
			//			}
			//
			//			const titleStyle = {margin: '.25em auto', 'fontSize': '125%'}
			//			const statusAndControlStyle = {marginBottom: '1em', display: 'flex', flexDirection: 'column'}
			//
			//			return (
			//				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
			//					<h3>XDebug Controls</h3>
			//					{error}
			//
			//					<div style={statusAndControlStyle}>
			//						<div className='XdebugStatus' style={titleStyle}>{statusString}</div>
			//						{button}
			//					</div>
			//
			//					{fieldList}
			//				</div>
			//			)
		}
	}
}
