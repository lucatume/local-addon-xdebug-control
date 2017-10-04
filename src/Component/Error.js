module.exports = function ( context ) {

	const React = context.React

	return function Error( props ) {
		const source = props.source || 'Unknown'
		const message = props.message || 'no message provided'
		const red = '#FF0000'
		const color = props.color || red
		const headerStyle = {
			'text-align': 'center',
			'margin-bottom': '1em',
			'font-size': '120%',
		}
		const errorStyle = {
			border: `2px solid ${color}`,
			padding: '.25em',
			color: color,
		}
		const footerStyle = {
			'text-align': 'center',
			'margin-top': '1em',
			'font-size': '120%',
		}

		return (
			<section className='Error' style={errorStyle}>
				<p className='Error__Message'>
					<div style={headerStyle}>
						Error generated in <span className='Error__Message__Source'>{source}</span>
					</div>
					<div className='Error__Message__Text'>{message}</div>
					<div style={footerStyle}>If you just booted Local up try to go back to SITE SETUP and get back to this...</div>
				</p>
			</section>
		)
	}
}