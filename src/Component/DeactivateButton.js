module.exports = function ( context ) {
	const React = context.React
	return function DeactivateButton( props ) {
		return (
			<button className="--GrayOutline --Small" onClick={props.onClick}>
				Deactivate XDebug
			</button>
		)
	}
}





