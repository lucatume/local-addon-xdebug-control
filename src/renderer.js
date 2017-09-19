'use strict'

const path = require( 'path' )

module.exports = function ( context ) {
	const hooks = context.hooks
	const React = context.React
	const remote = context.electron.remote
	const Router = context.ReactRouter

	// Development Helpers
	remote.getCurrentWindow().openDevTools()
	window.reload = remote.getCurrentWebContents().reloadIgnoringCache

	hooks.addFilter( 'siteInfoMoreMenu', function ( menu, site ) {
		menu.push( {
			label: 'XDebug Control',
			enabled: ! this.context.router.isActive( `/site-info/${site.id}/xdebug-control` ),
			click: () => {
				context.events.send( 'goToRoute', `/site-info/${site.id}/xdebug-control` )
			},
		} )
		return menu
	} )

	const XDebugControl = require( './Component/XDebugControl' )( context )

	// Add Route
	hooks.addContent( 'routesSiteInfo', () => {
		return <Router.Route
			key="site-info-my-component"
			path="/site-info/:siteID/xdebug-control"
			component={ XDebugControl }
		/>
	} )
}