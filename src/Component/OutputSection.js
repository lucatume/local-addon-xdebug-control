const PropTypes = require( 'prop-types' )
const assertPropTypes = require( 'check-prop-types' ).assertPropTypes

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {children} ) {
		const propTypes = {
			children: PropTypes.arrayOf( PropTypes.element ),
		}

		assertPropTypes( propTypes, {children} )

		let style = {display: 'flex', flexDirection: 'column', flex: 1}
		let i = 0

		if ( ! Array.isArray( children ) ) {
			children = [children]
		}

		return (
			<div style={style}>
				{children.map( function ( child ) {
					return (
						<div style={{marginBottom: '.5em', textAlign: 'center'}} key={`${child.type.name}-${i ++}`}>{child}</div>
					)
				} )}
			</div>
		)
	}
}
