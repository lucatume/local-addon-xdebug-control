const React = require( 'react' )
const expect = require( 'chai' ).expect
const shallow = require( 'enzyme' ).shallow
const sinon = require( 'sinon' )

const context = {
	'React': React,
	'jQuery': require( 'jquery' ),
}

const OptionField = require( './../../../src/Component/OptionField' )( context )
const Button = require( './../../../src/Component/Button' )( context )
const FieldsList = require( './../../../src/Component/FieldList' )( context )
const CommonFields = require( './../../../src/Data/CommonFields' )()

describe( '<FieldList />', function () {
	before( function () {
		this.backend = {
			read: function () {
				return '1'
			},
			write: function () {
			},
			afterWrite: function () {

			},
		}
		this.options = CommonFields.toggleOptions()
		this.fieldListProps = {
			fields: [
				{title: 'One', name: 'one', options: this.options, default: '0'},
				{title: 'Two', name: 'two', options: this.options, default: '1'},
				{title: 'Three', name: 'three', options: this.options, default: '0'},
			],
			readWith: this.backend.read,
			writeWith: this.backend.write,
			afterWrite: this.backend.afterWrite,

		}
	} )
	it( 'renders an option field for each provided field', function () {
		const wrapper = shallow( <FieldsList {...this.fieldListProps}/> )

		expect( wrapper.find( '.FieldList__Field' ) ).to.have.length( 3 )
		expect( wrapper.find( '.FieldList__Apply' ) ).to.have.length( 1 )
	} )

	it( 'calls the read callback to update the fields current value', function () {
		const read = sinon.spy( this.backend, 'read' )

		shallow( <FieldsList {...this.fieldListProps}/> )

		expect( read.withArgs( 'one', '0' ).calledOnce )
		expect( read.withArgs( 'two', '1' ).calledOnce )
		expect( read.withArgs( 'three', '0' ).calledOnce )
	} )

	it( 'calls the write callback to update the fields', function () {
		const write = sinon.spy( this.backend, 'write' )

		const wrapper = shallow( <FieldsList {...this.fieldListProps}/> )
		let fieldList = wrapper.instance()
		fieldList.update.bind( fieldList ).call()

		expect( write.withArgs( 'one', '0' ).calledOnce )
		expect( write.withArgs( 'two', '1' ).calledOnce )
		expect( write.withArgs( 'three', '0' ).calledOnce )
	} )

	it( 'calls the afterWrite function once after all write operations', function () {
		const afterWrite = sinon.spy( this.backend, 'afterWrite' )

		const wrapper = shallow( <FieldsList {...this.fieldListProps}/> )
		let fieldList = wrapper.instance()
		fieldList.update.bind( fieldList ).call()

		expect( afterWrite.withArgs().calledOnce )
	} )

	it( 'allows not defining the afterWrite function', function () {
		this.fieldListProps.afterWrite = undefined

		shallow( <FieldsList {...this.fieldListProps}/> )
	} )

	it( 'requires a writeWith argument', function () {
		this.fieldListProps.writeWith = undefined

		expect( function () {
			shallow( <FieldsList {...this.fieldListProps}/> )
		} ).to.throw()
	} )

	it( 'requires a writeWith argument', function () {
		this.fieldListProps.writeWith = undefined

		expect( function () {
			shallow( <FieldsList {...this.fieldListProps}/> )
		} ).to.throw()
	} )
} )
