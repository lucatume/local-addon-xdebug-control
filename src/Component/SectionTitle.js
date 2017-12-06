module.exports = function ( context ) {
	const React = context.React
	const Component = context.React.Component

	return function ( {text} ) {
		return (
			<h4 style={{textAlign: 'center'}}>{text}</h4>
		)
	}
}