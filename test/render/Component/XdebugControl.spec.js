const React = require( 'react' )
const Component = require( 'react' ).Component
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount
const sinon = require( 'sinon' )

const context = {
	'React': React,
}

const XDebugControl = require( './../../../lib/Component/XDebugControl' )( context )

describe( '<XDebugControl/>', function () {
	before( function () {
		this.props = {
			params: {
				siteId: 'foo',
			},
			sites: {
				foo: {
					container: '123344',
				},
			},
			environment: {
				dockerPath: '/app/docker',
				dockerEnv: {key: 'value'},
			},
		}
	} )

	it( 'renders correctly when machine is not running', function () {
		const wrapper = mount( <XDebugControl {...this.props}/> )
		expect( wrapper.find( '#xdebug-status' ) ).to.equal( 'Machine not running!' )
	} )
} )