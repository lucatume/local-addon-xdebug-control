const React = require( 'react' )
const Component = require( 'react' ).Component
const renderer = require( 'react-test-renderer' )
const colors = require( './../../../src/UI/colors' )

const context = {
	'React': React,
}

const Error = require( './../../../src/Component/Error' )( context )

describe( '<Error/>', function () {
	const defaultProps = {
		message: 'Woops',
		openIssueLink: 'http://theaveragedev.com',
		cta: 'Click here',
		color: colors.green(),
	}

	it( 'renders correctly with props', function () {
		const component = renderer.create( <Error {...defaultProps}/> )
		let tree = component.toJSON()

		expect( tree ).toMatchSnapshot()
	} )
} )
