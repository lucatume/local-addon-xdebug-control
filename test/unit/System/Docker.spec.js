const expect = require( 'chai' ).expect
const Docker = require( './../../../src/System/Docker' )()
const DockerError = require( './../../../src/Errors/DockerError' )()
const Container = require( './../../../src/System/Container' )()
const ContainerError = require( './../../../src/Errors/ContainerError' )()
const sinon = require( './../../../node_modules/sinon' )
const childProcess = require( 'child_process' )

describe( 'Docker::constructor', function () {
	it( 'should throw if dockerPath is not set', function () {
		const childProcess = {}

		expect( function () {
			new Docker( {dockerEnv: {foo: 'bar'}}, childProcess )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )

	it( 'should throw if dockerEnv is not set', function () {
		const childProcess = {}

		expect( function () {
			new Docker( {dockerPath: '/foo'}, childProcess )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )
} )

describe( 'Docker::runCommand', function () {
	before( function () {
		this.environment = {
			dockerEnv: {bar: 'baz'},
			dockerPath: 'foo',
		}
	} )

	it( 'should throw if child_process.execSync throws', function () {
		sinon.stub( childProcess, 'execSync' ).throws()

		const docker = new Docker( this.environment, childProcess )

		expect( function () {
			docker.runCommand( 'foo' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )

	it( 'should throw if trying to run empty command', function () {
		const docker = new Docker( this.environment, childProcess )

		expect( function () {
			docker.runCommand( '' )
		} ).to.throw().satisfies( function ( e ) {
			return e.name === 'DockerError'
		} )
	} )

	after( function () {
		childProcess.execSync.restore()
	} )
} )
