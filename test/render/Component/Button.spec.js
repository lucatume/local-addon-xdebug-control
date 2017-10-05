const React = require( 'react' )
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount

const context = {
	'React': React,
}

const Button = require( './../../../src/Component/Button' )( context )

describe( '<Button/>', function () {
	it( 'renders correctly when provided all props', function () {
		const myStyle = {'color': 'red'}
		const props = {text: 'foo', style: myStyle}

		const wrapper = mount( <Button {...props}/> )

		expect( wrapper.find( '.Button' ).text() ).to.equal( 'foo' )
	} )

	it( 'applies the correct style to center the button', function () {
		const props = {text: 'foo', centered: true}

		const wrapper = mount( <Button {...props}/> )
		const style = wrapper.find( '.Button' ).get( 0 ).props.style

		expect( style ).to.have.property( 'margin', '0 auto' )
		expect( style ).to.have.property( 'display', 'block' )
	} )

	it( 'splits the margin 0 auto style when a margin-x style is passed', function () {
		const props = {text: 'foo', centered: true, style: {'marginTop': '2em'}}

		const wrapper = mount( <Button {...props}/> )
		const style = wrapper.find( '.Button' ).get( 0 ).props.style

		expect( style ).not.to.have.property( 'margin', '0 auto' )
		expect( style ).to.have.property( 'marginTop', '2em' )
		expect( style ).to.have.property( 'marginRight', 'auto' )
		expect( style ).to.have.property( 'marginBottom', '0' )
		expect( style ).to.have.property( 'marginLeft', 'auto' )
		expect( style ).to.have.property( 'display', 'block' )
	} )

	it( 'allows overriding the margin property when centering', function () {
		const props = {text: 'foo', centered: true, style: {'margin': '2em auto'}}

		const wrapper = mount( <Button {...props}/> )
		const style = wrapper.find( '.Button' ).get( 0 ).props.style

		expect( style ).to.have.property( 'margin', '2em auto' )
		expect( style ).not.to.have.property( 'marginTop', '2em' )
		expect( style ).not.to.have.property( 'marginRight', 'auto' )
		expect( style ).not.to.have.property( 'marginBottom', '0' )
		expect( style ).not.to.have.property( 'marginLeft', 'auto' )
		expect( style ).to.have.property( 'display', 'block' )
	} )
} )
