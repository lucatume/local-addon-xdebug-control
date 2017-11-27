'use strict'

module.exports = function ( context ) {
	const hooks = context.hooks
	const React = context.React
	const Router = context.ReactRouter
	const createStore = require( 'redux' ).createStore
	const reducers = require( './reducers' )

	require( './utils' )( context )

	// @todo: get a good grasp on initial state here!

	const store = createStore( reducers )

	const XDebugControlProvider = require( './Component/XDebugControlProvider' )( context, store)

	hooks.addFilter( 'siteInfoMoreMenu', function ( menu, site ) {
		menu.push(
			{
				label: 'XDebug Control',
				enabled: ! this.context.router.isActive( `/site-info/${site.id}/xdebug-control` ),
				click: () => {
					context.events.send( 'goToRoute', `/site-info/${site.id}/xdebug-control` )
				},
			} )

		return menu
	} )

	// Add the XDebug Control route
	hooks.addContent( 'routesSiteInfo', () => {
		return <Router.Route
			key="site-info-xdebug-control"
			path="/site-info/:siteID/xdebug-control"
			component={XDebugControlProvider}
		/>
	} )
}