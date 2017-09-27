
const expect = require( 'chai' ).expect
const Docker = require( './../../../src/System/Docker' )()
const DockerError = require( './../../../src/Errors/DockerError' )()
const Container = require( './../../../src/System/Container' )()
const ContainerError = require( './../../../src/Errors/ContainerError' )()
const sinon = require( './../../../node_modules/sinon' )

describe( 'Container::constructor', function () {
	it( 'should throw if site.container information is missing', function () {
		const docker = sinon.createStubInstance( Docker )

		expect( function () {
			new Container( docker, {} )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'ContainerError'
		} )
	} )
} )

describe( 'Container::exec', function () {
	before( function () {
		this.site = {
			container: 'foo-container',
		}
	} )

	it( 'should return what Docker::runCommand returns', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( 'bar' )

		const container = new Container( docker, this.site )

		expect( container.exec( 'some-command' ) ).to.be.equal( 'bar' )
	} )

	it( 'should throw the error Docker::runCommand throws', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.throws( new DockerError )

		const container = new Container( docker, this.site )

		expect( function () {
			container.exec( 'foo' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )

	it( 'should return nothing if Docker::run command returns nothing', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( '' )

		const container = new Container( docker, this.site )

		expect( container.exec( 'foo' ) ).to.be.equal( '' )
	} )

	it( 'should throw if called with empty command', function () {
		const docker = sinon.createStubInstance( Docker )

		const container = new Container( docker, this.site )

		expect( function () {
			container.exec( '' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'ContainerError'
		} )
	} )
} )

describe( 'Container::getXdebugStatus', function () {
	before( function () {
		this.site = {
			container: 'foo-container',
		}
	} )

	it( 'should mark XDebug status as active if docker returns output', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( 'something' )

		const container = new Container( docker, this.site )

		expect( container.getXdebugStatus() ).to.be.equal( 'active' )
	} )

	it( 'should mark XDebug status as inactive if docker returns no output', function () {
		const docker = sinon.createStubInstance( Docker )
		docker.runCommand.returns( '' )

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
