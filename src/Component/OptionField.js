module.exports = function ( context ) {
	const React = context.React

	return function OptionField( props ) {
		let options = props.options.map( function ( option ) {
			return (
				<option value={option.value} selected={option.value == props.value} key={option.value.toString()}>
					{option.label}
				</option>
			)
		} )

		return (
			<li className="TableListRow">
				<strong>{props.title}</strong>
				<div>
					<select name={props.name} id={props.name}>
						{options}
					</select>
				</div>
			</li>
		)
	}
}