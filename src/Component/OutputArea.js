module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {children, centerX, centerY} ) {
		let style = {height: '100%', display: 'flex', flexDirection: 'column', flex: 1, padding: '0 5%'}

		if ( centerX !== false ) {
			style.alignContent = 'center'
		}

		if ( centerY !== false ) {
			style.alignItems = 'center'
		}

		return (
			<div style={style}>
				{children}
			</div>
		)
	}
}