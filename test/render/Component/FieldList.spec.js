const React = require( 'react' )
const expect = require( 'chai' ).expect
const shallow = require( 'enzyme' ).mount
const sinon = require( 'sinon' )

const context = {
	'React': React,
}

const OptionField = require( './../../../src/Component/OptionField' )( context )
const FieldsList = require( './../../../src/Component/FieldList' )( context )
const CommonFields = require( './../../../src/Data/CommonFields' )()

describe( '<FieldList />', function () {
	before( function () {
		this.options = CommonFields.toggleOptions()
		this.backend = {
			read: function () {

			},
			write: function () {

			},
		}
	} )

	it( 'renders an option field for each provided field', function () {
		const props = {
			fields: [
				{title: 'one', value: '0', default: '0', options: this.options},
				{title: 'two', value: '0', default: '0', options: this.options},
				{title: 'three', value: '0', default: '0', options: this.options},
			],
			readWith: this.backend.read,
			writeWith: this.backend.write,
		}

		const wrapper = shallow( <FieldsList {...props}/> )

		expect( wrapper.find( OptionField ) ).to.have.length( 3 )
	} )
} )
