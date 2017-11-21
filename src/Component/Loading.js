module.exports = function ( context ) {

	const React = context.React
	const Component = context.React.Component

	return function Loading( props ) {
		return (
			<div className="BigLoader" style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
				<div className="LoadingIndicator LoadingIndicator--Big">
					<div className="LoadingIndicator_Bounce1"></div>
					<div className="LoadingIndicator_Bounce2"></div>
					<div className="LoadingIndicator_Bounce3"></div>
				</div>
			</div>
		)
	}
}
