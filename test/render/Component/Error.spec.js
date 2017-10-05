const React = require( 'react' )
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount

const context = {
	'React': React,
}

const Error = require( './../../../src/Component/Error' )( context )

describe( '<Error/>', function () {
	it( 'renders correctly when provided all props', function () {
		const props = {source: 'foo', message: 'bar', cta: 'baz'}

		const wrapper = mount( <Error {...props}/> )

		expect( wrapper.find( '.Error__Message__Source' ).text() ).to.equal( 'foo' )
		expect( wrapper.find( '.Error__Message__Text' ).text() ).to.equal( 'bar' )
		expect( wrapper.find( '.Error__Message__CTA' ).text() ).to.equal( 'baz' )
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

	it( 'renders a default call to action message contining the link to open an issue', function () {
		const wrapper = mount( <Error/> )

		expect( wrapper.find( '.Error__Message__CTA' ).find( 'a' ).length ).to.equal( 1 )
	} )
} )
