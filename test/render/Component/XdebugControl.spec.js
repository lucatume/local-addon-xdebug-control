const React = require( 'react' )
const Component = require( 'react' ).Component
const expect = require( 'chai' ).expect
const mount = require( 'enzyme' ).mount
const shallow = require( 'enzyme' ).shallow
const sinon = require( 'sinon' )

const context = {
	'React': React,
}

const XDebugControl = require( './../../../src/Component/XDebugControl' )( context )
const Container = require( './../../../src/System/Container' )()
const Docker = require( './../../../src/System/Docker' )()
const DockerError = require( './../../../src/Errors/DockerError' )()
const ContainerError = require( './../../../src/Errors/ContainerError' )()

describe( '<XDebugControl/>', function () {
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

		expect( wrapper.find( '.XdebugStatus' ).text() ).to.equal( 'Machine not running!' )
	} )

	it( 'renders correctly when installation is not custom', function () {
		this.props.sites.foo.environment = 'flywheel'

		const wrapper = mount( <XDebugControl {...this.props}/> )

		expect( wrapper.find( '.XdebugStatus' ).text() ).to.equal( 'Only available for custom installations!' )
	} )

	it( 'renders correctly when installation is custom and XDebug is active', function () {
		this.props.siteStatus = 'running'
		this.props.sites.foo.environment = 'custom'

		const wrapper = shallow( <XDebugControl {...this.props}/> )

		expect( wrapper.find( '.XdebugStatus' ).text() ).to.equal( 'XDebug is n/a yet...' )
	} )

	it( 'renders correctly a DockerError', function () {
		const docker = sinon.createStubInstance( Docker )
		const container = sinon.createStubInstance( Container )
		container.getXdebugStatus.throws( function () {
			return new DockerError( 'something happened!' )
		} )
		this.props.docker = docker
		this.props.container = container

		const wrapper = shallow( <XDebugControl {...this.props}/> )
		wrapper.instance().componentWillReceiveProps( this.props )
		wrapper.update()

		expect( wrapper.find( 'Error' ) ).to.have.length( 1 )
	} )

	it( 'renders correctly a ContainerError', function () {
		const docker = sinon.createStubInstance( Docker )
		const container = sinon.createStubInstance( Container )
		container.getXdebugStatus.throws( function () {
			return new ContainerError( 'something happened!' )
		} )
		this.props.docker = docker
		this.props.container = container

		const wrapper = shallow( <XDebugControl {...this.props}/> )
		wrapper.instance().componentWillReceiveProps( this.props )
		wrapper.update()

		expect( wrapper.find( 'Error' ) ).to.have.length( 1 )
	} )
} )
