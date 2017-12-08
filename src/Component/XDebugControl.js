module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const PT = require( 'prop-types' )
	const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

	const Error = require( './Error' )( context )
	const Button = require( './Button' )( context )
	const XDebugFieldList = require( './XDebugFieldsList' )( context )
	const Loading = require( './Loading' )( context )
	const Title = require( './Title' )( context )
	const SectionTitle = require( './SectionTitle' )( context )
	const OutputArea = require( './OutputArea' )( context )
	const OutputSection = require( './OutputSection' )( context )
	const StatusString = require( './StatusString' )( context )

	return class XDebugControl extends Component {
		render() {
			if ( ! this.checkProps( this.props ) || this.props.site.loading === true ) {
				return (
					<Loading/>
				)
			}

			if ( this.props.site.hasError ) {
				return (
					<Error source='Site Container' message={this.props.site.error}/>
				)
			}

			const container = this.props.container()

			if ( container.environment !== 'custom' ) {
				return (
					<OutputArea>
						<Title text='Only available in custom installations!'/>
					</OutputArea>
				)
			} else {
				const xdebugStatus = this.props.xdebug && this.props.xdebug.status
					? this.props.xdebug.status
					: undefined

				if ( ['active', 'inactive'].indexOf( xdebugStatus ) === - 1 ) {
					return (
						<OutputArea>
							<Title text='XDebug Controls'/>
							<StatusString text='XDeubug status is undefined'/>
						</OutputArea>
					)
				}

				let button = null

				if ( xdebugStatus === 'inactive' ) {
					button = <Button text="Activate XDebug" onClick={container.activateXdebug.bind( container )}/>
				} else if ( xdebugStatus === 'active' ) {
					button = <Button text="Deactivate XDebug" onClick={container.deactivateXdebug.bind( container )}/>
				}

				return (
					<OutputArea>
						<Title text='XDebug Controls'/>
						<OutputSection>
							<StatusString status={xdebugStatus} text={`XDeubug is ${xdebugStatus}`}/>
							{button}
						</OutputSection>
						<OutputSection>
							<XDebugFieldList applyWith={container.applyXdebugSettings.bind( container )} status={this.props.xdebug}/>
						</OutputSection>
					</OutputArea>
				)
			}
		}

		maybeUpdateStatus() {
			if ( ! this.props.xdebug || ! this.props.xdebug.status ) {
				this.props.container().readXdebugStatus()
			}
		}

		componentDidMount() {
			this.maybeUpdateStatus()
		}


		checkProps( props ) {
			const propTypes = {
				site: PT.shape( {
					prevOutput: PT.array,
					prevError: PT.string,
					hasOutput: PT.bool,
					output: PT.array,
					hasError: PT.bool.isRequired,
					error: PT.string,
					loading: PT.bool.isRequired,
				} ),
				container: PT.func.isRequired,
			}

			try {
				assertPropTypes( propTypes, props )
			}
			catch ( e ) {
				return false
			}

			return true
		}
	}
}
