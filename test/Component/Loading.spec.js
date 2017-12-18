const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const Loading = require( './../../src/Component/Loading' )( context )

describe( '<Loading/>', function () {
	it( 'renders correctly with props', function () {
		const component = renderer.create( <Loading/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
