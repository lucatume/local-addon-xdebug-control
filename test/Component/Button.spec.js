const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const Button = require( './../../src/Component/Button' )( context )

describe( '<Button/>', function () {
	const defaultProps = {
		centered: false,
		style: {},
		onClick: function () {
			console.log( 'click' )
		},
		text: 'foo',
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <Button {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly with style props', function () {
		const props = Object.assign( {}, defaultProps, {display: 'inline-block', marginLeft: '4px'} )
		const component = renderer.create( <Button {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )

	it( 'renders correctly with margin style props', function () {
		const props = Object.assign( {}, defaultProps, {margin: '4px'} )
		const component = renderer.create( <Button {...props}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
