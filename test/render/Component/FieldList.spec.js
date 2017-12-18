const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )
const colors = require( './../../../src/UI/colors' )

const context = {
	'React': React,
}

const FieldList = require( './../../../src/Component/FieldList' )( context )

describe( '<FieldList/>', function () {
	const defaultProps = {
		fields: [
			{
				title: 'Foo',
				name: 'foo',
				value: 'foo',
				options: [{value: 'foo', label: 'foo'}, {value: 'bar', label: 'bar'}],
				default: 'bar',
			}, {
				title: 'Foo 1',
				name: 'foo-1',
				value: 'foo-2',
				options: [{value: 'foo', label: 'foo'}, {value: 'bar', label: 'bar'}],
				default: 'foo',
			},
		],
		applyWith: function () {
			return 'foo'
		},
		style: {},
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <FieldList {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
