const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React

	return function Button( props ) {
		const propTypes = {
			centered: PropTypes.bool,
			style: PropTypes.object,
			onClick: PropTypes.func.isRequired,
			text: PropTypes.string.isRequired,
		}

		assertPropTypes( propTypes, props )

		let buttonStyle = props.style || {}

		if ( props.centered ) {
			buttonStyle['display'] = 'block'

			if (
				buttonStyle['marginTop']
				|| buttonStyle['marginBottom']
				|| buttonStyle['marginLeft']
				|| buttonStyle['marginRight']
			) {
				buttonStyle['marginTop'] = buttonStyle['marginTop'] || '0'
				buttonStyle['marginBottom'] = buttonStyle['marginBottom'] || '0'
				buttonStyle['marginLeft'] = buttonStyle['marginLeft'] || 'auto'
				buttonStyle['marginRight'] = buttonStyle['marginRight'] || 'auto'
			} else if ( ! buttonStyle['margin'] ) {
				buttonStyle['margin'] = '0 auto'
			}
		}

		let button = (
			<button className="--GrayOutline --Small Button" onClick={props.onClick} style={buttonStyle}>
				{props.text}
			</button>
		)

		return button
	}
}