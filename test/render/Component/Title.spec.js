const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const Title = require( './../../../src/Component/Title' )( context )

describe( '<Title/>', function () {
	const defaultProps = {
		text: 'foo',
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <Title {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

} )
