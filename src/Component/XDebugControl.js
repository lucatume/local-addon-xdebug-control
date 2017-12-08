module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component
	const PropTypes = require( 'prop-types' )
	const checkProps = require( './../functions/proptypes' ).checkProps
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
			const propTypes = {
				site: PropTypes.shape( {
					loading: PropTypes.bool.isRequired,
					prevOutput: PropTypes.array,
					prevError: PropTypes.string,
					hasOutput: PropTypes.bool,
					output: PropTypes.array,
					hasError: PropTypes.bool,
					error: PropTypes.string,
				} ),
				xdebug: PropTypes.shape( {
					status: PropTypes.string,
				} ),
				container: PropTypes.func.isRequired,
			}

			if ( ! checkProps( this.props, propTypes ) || this.props.site.loading === true ) {
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
							<StatusString text='XDebug status is undefined'/>
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

		componentDidMount() {
			if ( this.props.container ) {
				this.props.container().readXdebugStatusAndSettings()
			}
		}
	}
}
