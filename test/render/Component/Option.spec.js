const React = require( 'react' )
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount

const context = {
	'React': React,
}

const Option = require( './../../../src/Component/Option' )( context )

describe( '<Option/>', function () {
	it( 'renders correctly when provided all props', function () {
		const props = {value: 'foo', selected: true, label: 'bar'}

		const wrapper = mount( <Option {...props}/> )

		const option = wrapper.find( 'option' )
		const ps = option.get( 0 ).props
		expect( ps.value ).to.equal( 'foo' )
		expect( option.text() ).to.equal( 'bar' )
	} )
} )
