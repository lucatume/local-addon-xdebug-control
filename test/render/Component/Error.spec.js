const React = require( 'react' )
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount
const shallow = require( 'enzyme' ).shallow

const context = {
	'React': React,
}

const Error = require( './../../../src/Component/Error' )( context )

describe( '<Error/>', function () {
	it( 'renders correctly when provided all props', function () {
		const props = {source: 'foo', message: 'bar'}

		const wrapper = mount( <Error {...props}/> )

		expect( wrapper.find( '.Error__Message__Source' ).text() ).to.equal( 'foo' )
		expect( wrapper.find( '.Error__Message__Text' ).text() ).to.equal( 'bar' )
	} )

	it( 'renders the source as unknown if not defined', function () {
		const props = {message: 'bar'}

		const wrapper = mount( <Error {...props}/> )

		expect( wrapper.find( '.Error__Message__Source' ).text() ).to.equal( 'Unknown' )
	} )

	it( 'renders the message as not provided if not defined', function () {
		const props = {source: 'bar'}

		const wrapper = mount( <Error {...props}/> )

		expect( wrapper.find( '.Error__Message__Text' ).text() ).to.equal( 'no message provided' )
	} )
} )
