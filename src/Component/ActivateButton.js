module.exports = function ( context ) {
	const React = context.React

	return function ActivateButton( props ) {
		return (
			<button className="--GrayOutline --Small" onClick={props.onClick}>
				Activate XDebug
			</button>
		)
	}
}





