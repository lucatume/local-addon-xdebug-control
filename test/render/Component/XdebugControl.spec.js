const React = require( 'react' )
const Component = require( 'react' ).Component
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount
const shallow = require( 'enzyme' ).shallow
const sinon = require( 'sinon' )

const context = {
	'React': React,
}

const XDebugControl = require( './../../../lib/Component/XDebugControl' )( context )

describe( '<XDebugControl/> status', function () {
	before( function () {
		this.props = {
			params: {
				siteID: 'foo',
			},
			sites: {
				foo: {
					environment: 'custom',
					container: '123344',
				},
			},
			environment: {
				dockerPath: '/app/docker',
				dockerEnv: {key: 'value'},
			},
			siteStatus: 'running',
		}
	} )

	it( 'renders correctly when machine is not running', function () {
		this.props.siteStatus = 'not running'
		const wrapper = mount( <XDebugControl {...this.props}/> )
		expect( wrapper.find( '.xdebugStatus' ).text() ).to.equal( 'Machine not running!' )
	} )

	it( 'renders correctly when installation is not custom', function () {
		this.props.sites.foo.environment = 'flywheel'
		const wrapper = mount( <XDebugControl {...this.props}/> )
		expect( wrapper.find( '.xdebugStatus' ).text() ).to.equal( 'Only available for custom installations!' )
	} )

	it( 'renders correctly when installation is custom and XDebug is active', function () {
		this.props.siteStatus = 'running'
		this.props.sites.foo.environment = 'custom'
		const wrapper = shallow( <XDebugControl {...this.props}/> )
		expect( wrapper.find( '.xdebugStatus' ).text() ).to.equal( 'XDebug is n/a yet...' )
	} )
} )