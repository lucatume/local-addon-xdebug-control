const colors = require( './../UI/colors' )
const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {text, status} ) {
		const propTypes = {
			text: PropTypes.string.isRequired,
			status: PropTypes.string.isRequired,
		}

		assertPropTypes( propTypes, {text, status} )

		const statusStyle = {textTransform: 'uppercase', fontSize: '125%'}
		statusStyle.color = status === 'active' ? colors.green() : colors.red()
		return (
			<span style={statusStyle}>{text}</span>
		)
	}
}