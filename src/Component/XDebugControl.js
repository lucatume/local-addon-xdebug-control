module.exports = function ( context ) {

	const React = context.React
	const Component = context.React.Component
	const Container = require( './../System/Container' )()
	const Docker = require( './../System/Docker' )()
	const Button = require( './Button' )( context )
	const FieldList = require( './FieldsList' )( context )
	const childProcess = require( 'child_process' )

	return class XDebugControl extends Component {
		constructor( props ) {
			if(undefined === props.environment){
				props.environment = context.environment
			}

			super( props )

			this.state = {
				siteStatus: 'off',
				xdebugStatus: 'n/a yet...',
			}

			this.site = props.sites[props.params.siteID]
			this.docker = new Docker( props.environment, childProcess )
			this.container = new Container( this.docker, this.site )
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
					}
				}
				catch ( e ) {
					if ( e.name === 'DockerError' || e.name === 'ContainerError' ) {
						newState = {
							siteStatus: 'running',
							xdebugStatus: e.message,
						}
					} else {
						throw e
					}
				}
			} else {
				newState = {
					siteStatus: 'stopped',
					xdebugStatus: 'n/a',
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
			let button = null
			let fieldList = null
			let isCustom = this.site.environment === 'custom'
			let xdebugStatus = null
			let statusStyle = {'text-transform': 'uppercase'}
			let isRunning = this.props.siteStatus === 'running'

			if ( ! isCustom ) {
				statusString = 'Only available for custom installations!'
			} else {
				xdebugStatus = this.state.xdebugStatus

				if ( xdebugStatus === 'active' ) {
					statusStyle['color'] = '#1FC37D'
				} else {
					statusStyle['color'] = '#FF0000'
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


			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<h4 className='xdebugStatus'>{statusString}</h4>
					{button}
					{fieldList}
				</div>
			)
		}
	}
}
