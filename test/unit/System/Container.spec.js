const expect = require( 'chai' ).expect
const Container = require( './../../../src/System/Container' )()

describe( 'exec', function () {
	it( 'returns what Docker::runCommand returns', function () {
		const dockerMock = {
			runCommand: function () {
				return 'bar'
			},
		}
		const siteMock = {
			container: 'foo-container',
		}

		const container = new Container( dockerMock, siteMock )

		expect( container.exec('some-command') ).to.be.equal( 'bar' )
	} )
} )