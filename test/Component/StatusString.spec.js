const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const StatusString = require( './../../src/Component/StatusString' )( context )

describe( '<StatusString/>', function () {
	const defaultProps = {
		text: 'foo',
		status: 'active',
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <StatusString {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly with inactive status', function () {
		const props = Object.assign( {}, defaultProps, {status: 'inactive'} )

		const component = renderer.create( <StatusString {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly with random status', function () {
		const props = Object.assign( {}, defaultProps, {status: 'foo'} )

		const component = renderer.create( <StatusString {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
