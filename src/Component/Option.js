module.exports = function ( context ) {
	const React = context.React

	return function Option( props ) {
		return (
			<option value={props.value} key={props.value.toString()}>
				{props.label}
			</option>
		)
	}
}
