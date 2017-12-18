const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const XDebugControl = require( './../../src/Component/XDebugControl' )( context )

describe( '<XDebugControl/>', function () {
	const defaultProps = {
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

	it( 'renders correctly provided no props', function () {
		const props = {}

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site loading status is undefined', function () {
		const props = Object.assign( {}, defaultProps, {site: {loading: undefined}} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site is loading', function () {
		const props = Object.assign( {}, defaultProps, {site: {loading: true}} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site produces an error with no message', function () {
		const props = Object.assign( {}, defaultProps, {site: {hasError: true}} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the site produces an error with a message', function () {
		const props = Object.assign( {}, defaultProps, {site: {hasError: true, error: 'An error happened'}} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when the container prop is undefined', function () {
		const props = Object.assign( {}, defaultProps, {container: undefined} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is not custom', function () {
		const props = Object.assign( {}, defaultProps, {
			container: function () {
				return {
					readXdebugStatusAndSettings: function () {
					},
					environment: 'not-custom',
				}
			},
		} )


		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom but XDebug status is undefined', function () {
		const props = Object.assign( {}, defaultProps, {xdebug: {}} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug is active', function () {
		const props = Object.assign( {}, defaultProps )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug is inactive', function () {
		const props = Object.assign( {}, defaultProps, {
			xdebug: {
				status: 'inactive',
			},
		} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when environment is custom and XDebug status is weird', function () {
		const props = Object.assign( {}, defaultProps, {
			xdebug: {
				status: 'foo',
			},
		} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when machine is not running', function () {
		const props = Object.assign( {}, defaultProps, {
			site: {
				running: false,
			},
		} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly when machine is disconnected', function () {
		const props = Object.assign( {}, defaultProps, {
			site: {
				disconnected: true,
			},
		} )

		const component = renderer.create( <XDebugControl {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
