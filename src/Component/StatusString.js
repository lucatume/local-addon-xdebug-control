const colors = require( './../UI/colors' )

module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {text, status} ) {

		const statusStyle = {textTransform: 'uppercase', fontSize: '125%'}
		statusStyle.color = status === 'active' ? colors.green() : colors.red()
		return (
			<span style={statusStyle}>{text}</span>
		)
	}
}