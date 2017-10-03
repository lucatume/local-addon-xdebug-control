module.exports = function ( context ) {

	const React = context.React

	return function Error( props ) {
		const source = props.source || 'Unknown'
		const message = props.message || 'no message provided'

		return (
			<section className='Error'>
				<p className='Error__Message'>
					From <span className='Error__Message__Source'>{source}</span>
					-
					<span className='Error__Message__Text'>{message}</span>
				</p>
			</section>
		)
	}
}