module.exports = function ( context ) {

	const React = context.React

	return function Error( props ) {
		const source = props.source || 'Unknown'
		const message = props.message || 'no message provided'
		const openIssueLink = 'https://github.com/lucatume/local-addon-xdebug-control/issues/new'
		const cta =  props.cta
		             || (<p>If the issue persists please open an issue <a href={openIssueLink}>on the addon repository</a> containing the message above, how you got here, what you were trying to do and your setup.</p>)
		const red = '#FF0000'
		const color = props.color || red
		const headerStyle = {
			'textAlign': 'center',
			'marginBottom': '1em',
			'fontSize': '120%',
		}
		const errorStyle = {
			border: `2px solid ${color}`,
			padding: '.25em',
			color: color,
		}
		const footerStyle = {
			'textAlign': 'center',
			'marginTop': '1em',
			'fontSize': '120%',
		}

		return (
			<section className='Error' style={errorStyle}>
				<div className='Error__Message'>
					<div style={headerStyle}>
						Error generated in <span className='Error__Message__Source'>{source}</span>
					</div>
					<div className='Error__Message__Text'>{message}</div>
					<div style={footerStyle} className='Error__Message__CTA'>{cta}</div>
				</div>
			</section>
		)
	}
}