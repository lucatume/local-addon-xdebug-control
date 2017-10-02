module.exports = function ( context ) {
	const React = context.React

	return function Button( props ) {
		let buttonStyle = props.style || {}

		if ( props.centered ) {
			buttonStyle['display'] = 'block'
			buttonStyle['margin'] = '0 auto'
		}

		let button = (
			<button className="--GrayOutline --Small" onClick={props.onClick} style={buttonStyle}>
				{props.text}
			</button>
		)

		return button
	}
}