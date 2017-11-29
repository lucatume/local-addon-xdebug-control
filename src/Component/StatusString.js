module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {text, status} ) {
		const green = '#1FC37D'
		const red = '#FF0000'

		const statusStyle = {textTransform: 'uppercase', fontSize: '200%', fontWeight: 'bold'}
		statusStyle.color = status === 'active' ? green : red
		return (
			<span style={statusStyle}>{text}</span>
		)
	}
}