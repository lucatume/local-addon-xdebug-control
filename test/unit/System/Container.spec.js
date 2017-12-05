
const expect = require( 'chai' ).expect
const Docker = require( './../../../src/System/Docker' )()
const DockerError = require( './../../../src/Errors/DockerError' )()
const Container = require( './../../../src/System/Container' )()
const ContainerError = require( './../../../src/Errors/ContainerError' )()
const sinon = require( './../../../node_modules/sinon' )

describe( 'Container::constructor', function () {
	it( 'should throw if site.docker information is missing', function () {
		const docker = sinon.createStubInstance( Docker )

		expect( function () {
			new Container( docker, {} )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'ContainerError'
		} )
	} )
} )

describe( 'Container::execAndSet', function () {
	before( function () {
		this.site = {
			docker: 'foo-docker',
		}
	} )

	it( 'should return what Docker::runCommand returns', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( 'bar' )

		const container = new Container( docker, this.site )

		expect( container.execAndSet( 'some-command' ) ).to.be.equal( 'bar' )
	} )

	it( 'should throw the error Docker::runCommand throws', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.throws( new DockerError )

		const container = new Container( docker, this.site )

		expect( function () {
			container.execAndSet( 'foo' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )

	it( 'should return nothing if Docker::run command returns nothing', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( '' )

		const container = new Container( docker, this.site )

		expect( container.execAndSet( 'foo' ) ).to.be.equal( '' )
	} )

	it( 'should throw if called with empty command', function () {
		const docker = sinon.createStubInstance( Docker )

		const container = new Container( docker, this.site )

		expect( function () {
			container.execAndSet( '' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'ContainerError'
		} )
	} )
} )

describe( 'Container::getXdebugStatus', function () {
	before( function () {
		this.site = {
			docker: 'foo-docker',
		}
	} )

	it( 'should mark XDebug status as active if docker returns active', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( 'active' )

		const container = new Container( docker, this.site )

		expect( container.getXdebugStatus() ).to.be.equal( 'active' )
	} )

	it( 'should mark XDebug status as inactive if docker returns inactive', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( 'inactive' )

		const container = new Container( docker, this.site )

		expect( container.getXdebugStatus() ).to.be.equal( 'inactive' )
	} )

	it( 'should throw Docker errors happening while reading XDebug status', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.throws( new DockerError )

		const container = new Container( docker, this.site )

		expect( function () {
			container.getXdebugStatus()
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )
} )
