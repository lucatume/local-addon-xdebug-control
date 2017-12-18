const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )
const colors = require( './../../src/UI/colors' )

const context = {
	'React': React,
}

const XDebugFieldsList = require( './../../src/Component/XDebugFieldsList' )( context )

describe( '<XDebugFieldsList/>', function () {
	const defaultProps = {
		status: {
			remote_enable: 'foo',
			remote_port: 'foo',
			remote_autostart: 'foo',
			remote_connect_back: 'foo',
			scream: 'foo',
			show_local_vars: 'foo',
		},
		applyWith: function () {
			return 'foo'
		},
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <XDebugFieldsList {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
