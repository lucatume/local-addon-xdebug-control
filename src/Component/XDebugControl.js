module.exports = function ( context ) {

	const Component = context.React.Component
	const React = context.React
	const Container = require( './../System/Container' )()
	const Docker = require( './../System/Docker' )()
	const Button = require( './Button' )( context )
	const childProcess = require( 'child_process' )

	//	const FieldList = require( './FieldsList' )( context )

	return class XDebugControl extends Component {
		constructor( props ) {
			super( props )
			this.state = {
				siteStatus: 'off',
				xdebugStatus: 'n/a',
			}
			this.site = this.props.sites[this.props.params.siteID]
			this.docker = new Docker( context, childProcess )
			this.container = new Container( this.docker, this.site )
		}

		componentWillMount() {
		}

		componentDidMount() {
			//			if ( this.props.siteStatus === 'running' && this.props.site.environment === 'custom' ) {
			//				this.showControls()
			//			} else {
			//				this.setState( {
			//					status: (
			//						<strong>Machine not running!</strong>
			//					),
			//				} )
			//			}
		}

		componentWillReceiveProps( nextProps ) {
			let newState = null

			if ( nextProps.siteStatus === 'running' ) {
				newState = {
					siteStatus: 'running',
					xdebugStatus: this.container.getXdebugStatus(),
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
			//			let xdebugStatus = this.state.status || this.container.getXdebugStatus()
			//			let button = null
			//			let statusStyle = {}
			//			let statusString = (
			//				<h4>Only available for custom installations.</h4>
			//			)
			//			let fieldList = null
			//
			//			if ( this.site.environment === 'custom' ) {
			//				statusString = (
			//					<h4>
			//						Current XDebug status: <strong><span style={statusStyle}>{this.state.status}</span></strong>
			//					</h4>
			//				)
			//				if ( xdebugStatus === 'inactive' ) {
			//					button = <Button
			//						text="Activate XDebug"
			//						disabled={this.state.loading === false}
			//						onClick={this.activateXdebug.bind( this )}
			//					/>
			//					statusStyle['color'] = '#FF0000'
			//				} else if ( xdebugStatus === 'active' ) {
			//					button = <Button
			//						text="Deactivate XDebug"
			//						disabled={this.state.loading === false}
			//						onClick={this.deactivateXdebug.bind( this )}
			//					/>
			//					statusStyle['color'] = '#1FC37D'
			//				}
			//
			//				let fieldListStyle = {
			//					'margin-top': '1em',
			//				}
			//
			//				if ( this.props.siteStatus === 'running' && this.props.site.environment === 'custom' ) {
			//					fieldList = <FieldList style={fieldListStyle} container={this.container} disabled={this.state.loading === false}/>
			//				}
			//			}
			//
			//			return (
			//				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
			//					<h3>XDebug Controls</h3>
			//					{statusString}
			//					{button}
			//					{fieldList}
			//				</div>
			//			)

			let statusString = null
			let button = null
			let isCustom = this.site.environment === 'custom'
			let xdebugStatus = null
			let statusStyle = {'text-transform': 'uppercase'}

			if ( ! isCustom ) {
				statusString = 'Only available on custom installations!'
			} else {
				xdebugStatus = this.state.xdebugStatus

				if ( xdebugStatus === 'active' ) {
					statusStyle['color'] = '#1FC37D'
				} else {
					statusStyle['color'] = '#FF0000'
				}

				if ( this.props.siteStatus === 'running' ) {
					statusString = (
						<p>XDebug status: <span style={statusStyle}>{xdebugStatus}</span></p>
					)
				} else {

					statusString = 'Machine non running!'
				}
			}

			if ( isCustom ) {

				if ( xdebugStatus === 'inactive' ) {
					button = <Button text="Activate XDebug" onClick={this.activateXdebug.bind( this )}/>
				} else if ( xdebugStatus === 'active' ) {
					button = <Button text="Deactivate XDebug" onClick={this.deactivateXdebug.bind( this )}/>
				}
			}

			return (
				<div style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}}>
					<h3>XDebug Controls</h3>
					<h4><strong>{statusString}</strong></h4>
					{button}
				</div>
			)
		}
	}
}
