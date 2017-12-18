const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React

	return function Option( props ) {
		const propTypes = {
			value: PropTypes.any.isRequired,
			label: PropTypes.string.isRequired,
		}

		assertPropTypes( propTypes, props )

		return (
			<option value={props.value} key={props.value.toString()}>
				{props.label}
			</option>
		)
	}
}
