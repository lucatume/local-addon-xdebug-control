const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {text} ) {
		const propTypes = {
			text: PropTypes.string.isRequired,
		}

		assertPropTypes( propTypes, {text} )

		return (
			<h3 style={{textAlign: 'center'}}>{text}</h3>
		)
	}
}