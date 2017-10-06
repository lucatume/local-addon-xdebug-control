const React = require( 'react' )
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount

const context = {
	'React': React,
}

const Option = require( './../../../src/Component/Option' )( context )
const OptionField = require( './../../../src/Component/OptionField' )( context )

describe( '<OptionField />', function () {
	it( 'renders correctly when provided all props', function () {
		const props = {
			options: [
				{label: 'one', value: 89},
				{label: 'two', value: 23},
				{label: 'three', value: 2389},
			],
			value: 23,
			title: 'bar',
			name: 'foo',
		}

		const wrapper = mount( <OptionField {...props}/> )

		const option = wrapper.find( '.OptionField' )
		expect( option.find( '.OptionField__Title' ).text() ).to.be.equal( 'bar' )
		const select = option.find( '.OptionField__Options' )
		const optionsProps = select.get( 0 ).props
		expect( optionsProps.name ).to.be.equal( 'foo' )
		expect( optionsProps.id ).to.be.equal( 'foo' )
		expect( select.find( '.OptionField__Option' ) ).to.have.length( 3 )
		expect( select.get( 0 ).props.defaultValue ).to.be.equal( 23 )
	} )

	it( 'selects the first option when value is not set', function () {
		const props = {
			options: [
				{label: 'one', value: 89},
				{label: 'two', value: 23},
				{label: 'three', value: 2389},
			],
			title: 'bar',
			name: 'foo',
		}

		const wrapper = mount( <OptionField {...props}/> )

		const option = wrapper.find( '.OptionField' )
		const select = option.find( '.OptionField__Options' )
		expect( select.find( '.OptionField__Option' ) ).to.have.length( 3 )
		expect( select.get( 0 ).props.defaultValue ).to.be.equal( 89 )
	} )
} )
