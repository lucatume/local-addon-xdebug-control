const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )

const context = {
	'React': React,
}

const OptionField = require( './../../../src/Component/OptionField' )( context )

describe( '<OptionField/>', function () {
	const defaultProps = {
		value: 'foo',
		default: 'foo',
		options: [{value: 'foo', label: 'foo'}, {value: 'bar', label: 'bar'}],
		title: 'Foo',
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <OptionField {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
