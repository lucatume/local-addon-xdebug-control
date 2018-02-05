const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const XDebugControl = require( './../../src/Component/XDebugControl' )( context )

const defaultProps = () => {
	return {
		site: {
			running: true,
			loading: false,
			disconnected: false,
			prevOutput: [],
			prevError: '',
			hasOutput: false,
			output: [],
			hasError: false,
			error: '',
		},
		xdebug: {
			status: 'active',
		},
		container: function () {
			return {
				deactivateXdebug: function () {
				},
				activateXdebug: function () {
				},
				applyXdebugSettings: function () {
				},
				readXdebugStatusAndSettings: function () {
				},
				environment: 'custom',
			}
		},
	}
}

describe( '<XDebugControl/>', function () {
	it( 'renders correctly provided no props', function () {
		const props = {}

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site loading status is undefined', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site.loading = undefined

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site is loading', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site.loading = true

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site produces an error with no message', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site.hasError = true
		props.site.error = undefined

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site produces an error with a message', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site.hasError = true
		props.site.error = 'An error happened'

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the container prop is undefined', function () {
		let props = Object.assign( {}, defaultProps() )
		props.container = undefined

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is not custom', function () {
		let props = Object.assign( {}, defaultProps() )
		props.container = function () {
			return {
				readXdebugStatusAndSettings: function () {
				},
				environment: 'not-custom',
			}
		}


		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom but XDebug status is undefined', function () {
		let props = Object.assign( {}, defaultProps() )
		props.xdebug = {}

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug is active', function () {
		let props = Object.assign( {}, defaultProps() )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug is inactive', function () {
		let props = Object.assign( {}, defaultProps() )
		props.xdebug = {
			status: 'inactive',
		}

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug status is weird', function () {
		let props = Object.assign( {}, defaultProps() )
		props.xdebug = {
			status: 'foo',
		}

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when machine is not running', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site = Object.assign( {}, props.site, {running: false} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when machine is disconnected', function () {
		let props = Object.assign( {}, defaultProps() )
		props.site = Object.assign( {}, props.site, {disconnected: true} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
