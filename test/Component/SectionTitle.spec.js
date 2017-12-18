const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const SectionTitle = require( './../../src/Component/SectionTitle' )( context )

describe( '<SectionTitle/>', function () {
	const defaultProps = {
		text: 'foo',
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <SectionTitle {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
