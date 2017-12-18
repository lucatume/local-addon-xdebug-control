const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const OutputArea = require( './../../../src/Component/OutputArea' )( context )

describe( '<OutputArea/>', function () {
	const defaultProps = {
		children: ['foo', 'bar', 'baz'].map( ( e ) => {
			return (
				<p>{e}</p>
			)
		} ),
		centerX: true,
		centerY: true,
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <OutputArea {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly without children', function () {
		const props = Object.assign( {}, defaultProps, {children: []} )
		const component = renderer.create( <OutputArea {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
