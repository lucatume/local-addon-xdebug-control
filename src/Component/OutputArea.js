const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {children, centerX, centerY} ) {
		const propTypes = {
			children: PropTypes.arrayOf( PropTypes.element ),
			centerX: PropTypes.bool,
			centerY: PropTypes.bool,
		}

		assertPropTypes( propTypes, {children, centerX, centerY} )

		let style = {height: '100%', display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}

		if ( centerX !== false ) {
			style.alignContent = 'center'
		}

		if ( centerY !== false ) {
			style.alignItems = 'center'
		}

		let i = 0

		if ( ! Array.isArray( children ) ) {
			children = [children]
		}

		return (
			<div style={style}>
				{children.map( function ( child ) {
					return (
						<div style={{marginTop: '1em', marginBottom: '1em'}} key={`${child.type.name}-${i ++}`}>{child}</div>
					)
				} )}
			</div>
		)
	}
}