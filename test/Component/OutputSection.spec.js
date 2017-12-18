const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const OutputSection = require( './../../src/Component/OutputSection' )( context )

describe( '<OutputSection/>', function () {
	const defaultProps = {
		children: ['foo', 'bar', 'baz'].map( ( e ) => {
			return (
				<p>{e}</p>
			)
		} ),
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <OutputSection {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly without children', function () {
		const props = Object.assign( {}, defaultProps, {children: []} )
		const component = renderer.create( <OutputSection {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
